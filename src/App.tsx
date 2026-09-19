import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { allKnowledgePoints, allPracticeQuestions, allSections, courseChapters } from './content/course'
import type { KnowledgePoint } from './content/chapter1'
import { gradeQuestion, recordMistake, searchKnowledgePoints, type QuestionAnswer } from './lib/course'
import { defaultAppState, loadAppState, saveAppState, type AppState, type FavoriteRecord } from './lib/storage'
import { Sidebar } from './components/Sidebar'
import { KnowledgeView } from './components/KnowledgeView'
import { PracticeView } from './components/PracticeView'
import { LibraryView } from './components/LibraryView'

type View = 'home' | 'study' | 'practice' | 'mistakes' | 'favorites'

export default function App() {
  const [state, setState] = useState<AppState>(() => loadAppState())
  const [view, setView] = useState<View>('home')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => { saveAppState(state); document.documentElement.dataset.theme = state.theme }, [state])
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(''), 2400); return () => window.clearTimeout(timer) }, [notice])
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === '/' && !searchOpen && document.activeElement?.tagName !== 'INPUT') { event.preventDefault(); setSearchOpen(true) } if (event.key === 'Escape') setSearchOpen(false) }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [searchOpen])

  const currentPoint = allKnowledgePoints.find((point) => point.id === state.currentKnowledgePointId) ?? allKnowledgePoints[0]
  const currentSection = allSections.find((section) => section.id === currentPoint.sectionId) ?? allSections[0]
  const currentChapter = courseChapters.find((chapter) => chapter.sections.some((section) => section.id === currentSection.id)) ?? courseChapters[0]
  const completedCount = state.completedPointIds.length
  const progress = Math.round((completedCount / allKnowledgePoints.length) * 100)
  const pointTitles = useMemo(() => Object.fromEntries(allKnowledgePoints.map((point) => [point.id, point.title])), [])
  const sectionQuestions = allPracticeQuestions.filter((question) => question.sectionId === currentSection.id)
  const searchResults = searchKnowledgePoints(allKnowledgePoints, searchQuery)
  const favoriteIds = state.favorites.filter((favorite) => favorite.kind === 'point').map((favorite) => favorite.id)

  const updateState = (change: Partial<AppState>) => setState((previous) => ({ ...previous, ...change }))
  const goToPoint = (id: string) => { const point = allKnowledgePoints.find((item) => item.id === id); if (!point) return; const chapter = courseChapters.find((item) => item.sections.some((section) => section.id === point.sectionId)); updateState({ currentChapterId: chapter?.id ?? state.currentChapterId, currentKnowledgePointId: id, currentSectionId: point.sectionId }); setView('study'); setSearchOpen(false) }
  const nextPoint = (point: KnowledgePoint) => { const index = allKnowledgePoints.findIndex((item) => item.id === point.id); return allKnowledgePoints[index + 1] }
  const completeAndNext = () => { const next = nextPoint(currentPoint); updateState({ currentKnowledgePointId: next?.id ?? currentPoint.id, currentSectionId: next?.sectionId ?? currentPoint.sectionId, completedPointIds: state.completedPointIds.includes(currentPoint.id) ? state.completedPointIds : [...state.completedPointIds, currentPoint.id] }); if (next) setView('study'); else setView('practice') }
  const completeCurrentAndOpenPractice = () => { updateState({ completedPointIds: state.completedPointIds.includes(currentPoint.id) ? state.completedPointIds : [...state.completedPointIds, currentPoint.id] }); setView('practice') }
  const toggleFavorite = () => { const exists = state.favorites.some((favorite) => favorite.id === currentPoint.id && favorite.kind === 'point'); const favorites = exists ? state.favorites.filter((favorite) => !(favorite.id === currentPoint.id && favorite.kind === 'point')) : [...state.favorites, { id: currentPoint.id, kind: 'point' } as FavoriteRecord]; updateState({ favorites }); setNotice(exists ? '已取消收藏' : '已加入收藏') }
  const saveMistake = (questionId: string, answer: QuestionAnswer) => updateState({ mistakes: recordMistake(state.mistakes, questionId, answer) })
  const savePracticeResult = (score: number, total: number) => { updateState({ practiceResults: { ...state.practiceResults, [currentSection.id]: { score, total, completedAt: new Date().toISOString() } } }); setNotice('本节练习结果已保存') }
  const openPracticeForQuestion = (questionId: string) => { const question = allPracticeQuestions.find((item) => item.id === questionId); if (question) { goToPoint(question.knowledgePointId); setView('practice') } }

  const renderContent = () => {
    if (view === 'home') return <HomeView progress={progress} completedCount={completedCount} totalPoints={allKnowledgePoints.length} currentPoint={currentPoint} chapters={courseChapters} practiceResults={state.practiceResults} onContinue={() => setView('study')} onOpenPoint={goToPoint} onOpenPractice={() => setView('practice')} />
    if (view === 'study') return <div className="study-layout"><Sidebar chapters={courseChapters} currentPointId={currentPoint.id} completedPointIds={state.completedPointIds} onSelectPoint={goToPoint} /><KnowledgeView point={currentPoint} chapterTitle={currentChapter.title} isFavorite={favoriteIds.includes(currentPoint.id)} isCompleted={state.completedPointIds.includes(currentPoint.id)} isLast={!nextPoint(currentPoint) || nextPoint(currentPoint)?.sectionId !== currentPoint.sectionId} onToggleFavorite={toggleFavorite} onComplete={completeAndNext} onOpenPractice={completeCurrentAndOpenPractice} /></div>
    if (view === 'practice') return <PracticeView sectionTitle={currentSection.title} questions={sectionQuestions} pointTitles={pointTitles} onNavigatePoint={goToPoint} onMistake={(question, answer) => saveMistake(question.id, answer)} onComplete={savePracticeResult} />
    return <LibraryView mode={view} mistakes={state.mistakes} favorites={state.favorites} questions={allPracticeQuestions} points={allKnowledgePoints} onOpenPoint={goToPoint} onPracticeQuestion={openPracticeForQuestion} />
  }

  return <div className="app-shell">
    <header className="topbar"><button className="brand" onClick={() => setView('home')} aria-label="返回首页"><span className="brand-mark">DB</span><span><strong>DB SPRINT</strong><small>数据库系统概论 · 第 6 版</small></span></button><nav className="topnav" aria-label="主导航"><button className={view === 'home' ? 'is-active' : ''} onClick={() => setView('home')}>首页</button><button className={view === 'study' ? 'is-active' : ''} onClick={() => setView('study')}>学习</button><button className={view === 'practice' ? 'is-active' : ''} onClick={() => setView('practice')}>练习</button><button className={view === 'mistakes' ? 'is-active' : ''} onClick={() => setView('mistakes')}>错题本 <span className="nav-count">{state.mistakes.length}</span></button><button className={view === 'favorites' ? 'is-active' : ''} onClick={() => setView('favorites')}>收藏</button></nav><div className="top-actions"><button className="search-trigger" onClick={() => setSearchOpen(true)}><span>⌕</span><span>搜索知识点</span><kbd>/</kbd></button><button className="theme-toggle" onClick={() => updateState({ theme: state.theme === 'light' ? 'dark' : 'light' })} aria-label="切换深色模式"><span aria-hidden="true">{state.theme === 'light' ? '☼' : '◐'}</span></button></div></header>
    <main>{renderContent()}</main>
    {notice && <div className="toast" role="status">{notice}</div>}
    {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="搜索知识点"><button className="overlay-dismiss" onClick={() => setSearchOpen(false)} aria-label="关闭搜索">×</button><div className="search-panel"><span className="eyebrow">KNOWLEDGE SEARCH</span><h2>搜索知识点</h2><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="输入“三级模式”“关系模型”..." />{searchQuery && <div className="search-results">{searchResults.length === 0 ? <p className="muted-copy">没有找到匹配的知识点。</p> : searchResults.map((result) => <button key={result.id} className="search-result" onClick={() => goToPoint(result.id)}><span><small>{result.sectionTitle}</small><strong>{result.title}</strong></span><span>→</span></button>)}</div>}<p className="search-hint">按 Esc 关闭 · 只搜索知识点名称与关键词</p></div></div>}
  </div>
}

function HomeView({ progress, completedCount, totalPoints, currentPoint, chapters, practiceResults, onContinue, onOpenPoint, onOpenPractice }: { progress: number; completedCount: number; totalPoints: number; currentPoint: KnowledgePoint; chapters: typeof courseChapters; practiceResults: AppState['practiceResults']; onContinue: () => void; onOpenPoint: (id: string) => void; onOpenPractice: () => void }) {
  return <div className="home-view"><section className="home-hero"><div className="hero-copy"><span className="eyebrow">DATABASE SYSTEMS · FULL COURSE</span><h1>先建地图，<em>再进题海。</em></h1><p>沿着教材的 18 章结构，把数据库系统从关系模型、SQL、设计与系统实现，一路串到大数据、内存数据库和区块链。</p><div className="hero-actions"><button className="button button-primary" onClick={onContinue}>继续学习 <span>→</span></button><button className="text-button" onClick={onOpenPractice}>直接进入练习</button></div></div><div className="hero-motif" aria-hidden="true"><div className="motif-ring ring-one" /><div className="motif-ring ring-two" /><div className="motif-ring ring-three" /><div className="motif-core"><span>DB</span><small>18</small></div><div className="motif-label label-one">结构</div><div className="motif-label label-two">系统</div><div className="motif-label label-three">演进</div></div></section>
    <section className="continue-section"><div className="section-title-row"><div><span className="section-label">CONTINUE LEARNING</span><h2>从上次停下的地方继续</h2></div><span className="progress-caption">{completedCount} / {totalPoints} 个知识点</span></div><div className="continue-card"><div className="continue-index">{String(currentPoint.id.split('-')[0]).padStart(2, '0')}</div><div className="continue-info"><span>{currentPoint.sectionTitle}</span><h3>{currentPoint.title}</h3><p>{currentPoint.summary}</p></div><div className="continue-progress"><div className="progress-ring" style={{ '--progress': `${Math.max(progress, 3)}%` } as CSSProperties}><strong>{progress}%</strong></div><button className="button button-primary" onClick={onContinue}>继续学习 <span>→</span></button></div></div></section>
    <section className="chapter-section"><div className="section-title-row"><div><span className="section-label">COURSE MAP · 18 CHAPTERS</span><h2>从绪论走到新技术</h2></div><span className="muted-copy">{Object.keys(practiceResults).length} 个小节已练习</span></div><div className="chapter-grid">{chapters.map((chapter) => { const points = chapter.sections.flatMap((section) => section.points); return <button className="chapter-card" key={chapter.id} onClick={() => onOpenPoint(points[0].id)}><span className="chapter-number">{String(chapter.number).padStart(2, '0')}</span><div><h3>{chapter.title.replace(/^第\d+章\s*/, '')}</h3><p>{points.length} 个知识点 · {chapter.sections.length} 节</p></div><span className="chapter-arrow">→</span></button> })}</div></section>
    <section className="principle-note"><span className="quote-mark">“</span><div><span className="section-label">学习原则</span><p>每个知识点只解决一个理解问题。先看核心定义，再展开细节，最后用练习确认自己真的会了。</p></div></section>
  </div>
}

