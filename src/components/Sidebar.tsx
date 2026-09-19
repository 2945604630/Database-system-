import type { CourseChapter } from '../content/course'

type SidebarProps = {
  chapters: CourseChapter[]
  currentPointId: string
  completedPointIds: string[]
  onSelectPoint: (id: string) => void
}

export function Sidebar({ chapters, currentPointId, completedPointIds, onSelectPoint }: SidebarProps) {
  const currentChapter = chapters.find((chapter) => chapter.sections.some((section) => section.points.some((point) => point.id === currentPointId))) ?? chapters[0]
  return (
    <aside className="sidebar" aria-label="课程目录">
      <div className="sidebar-heading">
        <div>
          <span className="eyebrow">FULL COURSE · 18 CHAPTERS</span>
          <h2>数据库系统概论</h2>
        </div>
        <span className="chapter-mark">18</span>
      </div>
      <p className="sidebar-note">沿着教材顺序建立完整地图，再按章节进入知识点与练习。</p>
      <nav className="tree-nav">
        {chapters.map((chapter) => {
          const chapterPoints = chapter.sections.flatMap((section) => section.points)
          const chapterDone = chapterPoints.filter((point) => completedPointIds.includes(point.id)).length
          return (
            <details key={chapter.id} open={chapter.id === currentChapter.id}>
              <summary className="chapter-summary">
                <span className="summary-label"><span className="tree-chevron">⌄</span><span><small>{chapter.part}</small>{chapter.title}</span></span>
                <span className="tree-count">{chapterDone}/{chapterPoints.length}</span>
              </summary>
              <div className="chapter-tree-sections">
                {chapter.sections.map((section) => {
                  const done = section.points.filter((point) => completedPointIds.includes(point.id)).length
                  const sectionActive = section.points.some((point) => point.id === currentPointId)
                  return (
                    <details key={section.id} open={sectionActive || chapter.id === currentChapter.id}>
                      <summary>
                        <span className="summary-label"><span className="tree-chevron">⌄</span>{section.title}</span>
                        <span className="tree-count">{done}/{section.points.length}</span>
                      </summary>
                      <div className="point-list">
                        {section.points.map((point) => {
                          const complete = completedPointIds.includes(point.id)
                          const active = currentPointId === point.id
                          return (
                            <button key={point.id} className={`point-link ${active ? 'is-active' : ''}`} onClick={() => onSelectPoint(point.id)} aria-current={active ? 'page' : undefined}>
                              <span className={`status-dot ${complete ? 'is-done' : ''}`}>{complete ? '✓' : '○'}</span>
                              <span>{point.title}</span>
                            </button>
                          )
                        })}
                      </div>
                    </details>
                  )
                })}
              </div>
            </details>
          )
        })}
      </nav>
      <div className="sidebar-footer">
        <span className="status-dot is-done">✓</span>
        <span>完成后进入本节练习</span>
      </div>
    </aside>
  )
}

