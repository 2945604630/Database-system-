import type { KnowledgePoint } from '../content/chapter1'
import { Diagram } from './Diagram'

type KnowledgeViewProps = {
  point: KnowledgePoint
  chapterTitle: string
  isFavorite: boolean
  isCompleted: boolean
  isLast: boolean
  onToggleFavorite: () => void
  onComplete: () => void
  onOpenPractice: () => void
}

export function KnowledgeView({ point, chapterTitle, isFavorite, isCompleted, isLast, onToggleFavorite, onComplete, onOpenPractice }: KnowledgeViewProps) {
  return <article className="knowledge-view">
    <div className="breadcrumb"><span>{chapterTitle}</span><span>/</span><span>{point.sectionTitle}</span></div>
    <div className="point-heading">
      <div>
        <span className="eyebrow">{point.type} · {point.sourceType}</span>
        <h1>{point.title}</h1>
        <p className="lead">{point.summary}</p>
      </div>
      <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} onClick={onToggleFavorite} aria-pressed={isFavorite}>
        <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>{isFavorite ? '已收藏' : '收藏知识点'}
      </button>
    </div>

    <div className="knowledge-grid">
      <section className="definition-card accent-card">
        <span className="section-label">先记住</span>
        <p>{point.definition}</p>
      </section>
      <section className="quick-card">
        <span className="section-label">一句话理解</span>
        <p>{point.summary}</p>
      </section>
    </div>

    <section className="remember-section">
      <div className="section-title-row"><div><span className="section-label">速通清单</span><h2>必须记住</h2></div>{point.markers?.map((marker) => <span className={`marker ${marker === '考试重点' ? 'marker-focus' : 'marker-warning'}`} key={marker}>{marker}</span>)}</div>
      <ul className="remember-list">{point.remember.map((item) => <li key={item}><span className="checkmark">✓</span>{item}</li>)}</ul>
    </section>

    {point.diagram && <section className="diagram-section"><div className="section-title-row"><div><span className="section-label">结构化理解</span><h2>把关系画出来</h2></div><span className="diagram-caption">先看结构，再背术语</span></div><Diagram kind={point.diagram} /></section>}

    {point.example && <section className="example-card"><div className="example-top"><span className="section-label">理解例子</span><span className="source-chip">{point.example.sourceType}</span></div><h2>{point.example.prompt}</h2><details><summary>查看示例答案</summary><p className="example-answer">{point.example.answer}</p><p className="muted-copy">{point.example.explanation}</p></details></section>}

    <details className="deep-dive"><summary><span><span className="section-label">详细内容</span><strong>为什么这样理解？</strong></span><span className="summary-plus">+</span></summary><div className="deep-dive-body">{point.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></details>

    <div className="source-note"><span className="source-chip">{point.sourceType}</span><span>{point.source}</span><span className="source-divider">·</span><span>{point.sourceType === '教材内容' ? '根据教材正文整理' : '为帮助理解而补充，不替代教材原文'}</span></div>

    <div className="knowledge-actions">
      <div>{isCompleted && <span className="completed-note"><span className="status-dot is-done">✓</span>已完成</span>}</div>
      {isLast ? <button className="button button-primary" onClick={onOpenPractice}>进入本节练习 <span>→</span></button> : <button className="button button-primary" onClick={onComplete}>{isCompleted ? '进入下一个知识点' : '完成并进入下一个'} <span>→</span></button>}
    </div>
  </article>
}

