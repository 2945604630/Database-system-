import type { KnowledgePoint, PracticeQuestion } from '../content/chapter1'
import type { FavoriteRecord } from '../lib/storage'
import type { MistakeRecord } from '../lib/course'

type LibraryViewProps = {
  mode: 'mistakes' | 'favorites'
  mistakes: MistakeRecord[]
  favorites: FavoriteRecord[]
  questions: PracticeQuestion[]
  points: KnowledgePoint[]
  onOpenPoint: (id: string) => void
  onPracticeQuestion: (id: string) => void
}

export function LibraryView({ mode, mistakes, favorites, questions, points, onOpenPoint, onPracticeQuestion }: LibraryViewProps) {
  const mistakeItems = mistakes.map((mistake) => ({ mistake, question: questions.find((question) => question.id === mistake.questionId) })).filter((item) => item.question)
  const favoritePoints = favorites.filter((item) => item.kind === 'point').map((favorite) => points.find((point) => point.id === favorite.id)).filter(Boolean) as KnowledgePoint[]
  return <section className="library-view"><div className="library-heading"><span className="eyebrow">PERSONAL LIBRARY</span><h1>{mode === 'mistakes' ? '错题本' : '我的收藏'}</h1><p>{mode === 'mistakes' ? '错误会被保留，重新答对也不会抹去你的复习痕迹。' : '把真正需要二刷的概念和易错点放在这里。'}</p></div>
    {mode === 'mistakes' ? mistakeItems.length === 0 ? <EmptyLibrary title="还没有错题" text="完成一组练习，答错的题目会自动出现在这里。" /> : <div className="library-list">{mistakeItems.map(({ mistake, question }) => <article className="library-item" key={mistake.questionId}><div><span className="item-kicker">错误 {mistake.count} 次 · {question!.sourceDetail}</span><h2>{question!.prompt}</h2><p>{question!.explanation}</p></div><div className="library-actions"><button className="button button-secondary" onClick={() => onOpenPoint(question!.knowledgePointId)}>看知识点</button><button className="button button-primary" onClick={() => onPracticeQuestion(question!.id)}>重新练习</button></div></article>)}</div> : favoritePoints.length === 0 ? <EmptyLibrary title="还没有收藏" text="在知识点页点击“收藏知识点”，把想二刷的内容放进来。" /> : <div className="favorite-grid">{favoritePoints.map((point) => <article className="favorite-item" key={point.id}><span className="item-kicker">知识点 · {point.sectionTitle}</span><h2>{point.title}</h2><p>{point.summary}</p><button className="inline-link" onClick={() => onOpenPoint(point.id)}>打开知识点 →</button></article>)}</div>}
  </section>
}

function EmptyLibrary({ title, text }: { title: string; text: string }) { return <div className="empty-state"><span className="empty-mark">○</span><h2>{title}</h2><p>{text}</p></div> }

