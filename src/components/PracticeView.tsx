import { useMemo, useState } from 'react'
import type { PracticeQuestion } from '../content/chapter1'
import { gradeQuestion, type QuestionAnswer } from '../lib/course'

type PracticeViewProps = {
  sectionTitle: string
  questions: PracticeQuestion[]
  pointTitles: Record<string, string>
  onNavigatePoint: (id: string) => void
  onMistake: (question: PracticeQuestion, answer: QuestionAnswer) => void
  onComplete: (score: number, total: number) => void
}

export function PracticeView({ sectionTitle, questions, pointTitles, onNavigatePoint, onMistake, onComplete }: PracticeViewProps) {
  const [answers, setAnswers] = useState<Record<string, QuestionAnswer>>({})
  const [submitted, setSubmitted] = useState<Record<string, ReturnType<typeof gradeQuestion>>>({})
  const score = useMemo(() => Object.values(submitted).filter((result) => result.correct).length, [submitted])
  const allSubmitted = questions.length > 0 && questions.every((question) => submitted[question.id])

  const choose = (question: PracticeQuestion, option: string) => {
    if (question.type === 'multiple') {
      const previous = Array.isArray(answers[question.id]) ? answers[question.id] as string[] : []
      setAnswers({ ...answers, [question.id]: previous.includes(option) ? previous.filter((item) => item !== option) : [...previous, option] })
    } else {
      setAnswers({ ...answers, [question.id]: option })
    }
  }

  const check = (question: PracticeQuestion) => {
    const answer = answers[question.id] ?? ''
    const result = gradeQuestion(question, answer)
    setSubmitted({ ...submitted, [question.id]: result })
    if (!result.correct) onMistake(question, answer)
  }

  return <section className="practice-view">
    <div className="practice-hero"><span className="eyebrow">SECTION CHECK · {sectionTitle}</span><h1>小节练习</h1><p>先做基础题，再用混合题检查你是否真的能区分概念。</p><div className="score-pod"><strong>{score}</strong><span>/ {questions.length} 已答对</span></div></div>
    {questions.length === 0 ? <div className="empty-state"><span className="empty-mark">·</span><h2>本节练习正在整理</h2><p>先继续学习其他知识点，练习题会跟随小节逐步补齐。</p></div> : <>
      <div className="practice-group"><div className="group-heading"><span className="group-index">01</span><div><span className="section-label">基础题</span><h2>先确认单个概念</h2></div></div>{questions.slice(0, 2).map((question, index) => <QuestionCard key={question.id} question={question} index={index + 1} answer={answers[question.id]} result={submitted[question.id]} onChoose={choose} onCheck={check} onNavigatePoint={onNavigatePoint} pointTitle={pointTitles[question.knowledgePointId]} />)}</div>
      {questions.length > 2 && <div className="practice-group"><div className="group-heading"><span className="group-index">02</span><div><span className="section-label">混合题</span><h2>把多个知识点串起来</h2></div></div>{questions.slice(2).map((question, index) => <QuestionCard key={question.id} question={question} index={index + 3} answer={answers[question.id]} result={submitted[question.id]} onChoose={choose} onCheck={check} onNavigatePoint={onNavigatePoint} pointTitle={pointTitles[question.knowledgePointId]} />)}</div>}
      <div className="practice-finish">{allSubmitted ? <><div><span className="section-label">本次结果</span><strong>{score} / {questions.length}</strong><span>答对</span></div><button className="button button-primary" onClick={() => onComplete(score, questions.length)}>保存本节结果</button></> : <p>完成全部题目后，这里会显示本节结果。</p>}</div>
    </>}
  </section>
}

function QuestionCard({ question, index, answer, result, onChoose, onCheck, onNavigatePoint, pointTitle }: { question: PracticeQuestion; index: number; answer?: QuestionAnswer; result?: ReturnType<typeof gradeQuestion>; onChoose: (question: PracticeQuestion, option: string) => void; onCheck: (question: PracticeQuestion) => void; onNavigatePoint: (id: string) => void; pointTitle?: string }) {
  const options = question.type === 'fill' ? [] : question.options ?? []
  return <article className={`question-card ${result ? (result.correct ? 'is-correct' : 'is-wrong') : ''}`}>
    <div className="question-meta"><span>Q{String(index).padStart(2, '0')}</span><span>{question.source}</span><span>{question.sourceDetail}</span></div>
    <h3>{question.prompt}</h3>
    {question.type === 'fill' ? <input className="answer-input" value={typeof answer === 'string' ? answer : ''} onChange={(event) => onChoose(question, event.target.value)} placeholder="输入你的答案" aria-label="填空答案" /> : <div className="option-list">{options.map((option) => { const selected = Array.isArray(answer) ? answer.includes(option) : answer === option; return <button key={option} className={`option-button ${selected ? 'is-selected' : ''}`} onClick={() => onChoose(question, option)} disabled={Boolean(result)}><span className="option-marker">{selected ? '✓' : '○'}</span>{option}</button> })}</div>}
    <div className="question-footer"><button className="button button-secondary" onClick={() => onCheck(question)} disabled={Boolean(result) || answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0)}>检查答案</button>{result && <span className={`feedback ${result.correct ? 'feedback-correct' : 'feedback-wrong'}`}>{result.correct ? '回答正确' : '需要回看'}</span>}</div>
    {result && <div className="answer-explanation"><strong>{result.correct ? '抓住了这个判断。' : `正确答案：${Array.isArray(result.answer) ? result.answer.join('、') : result.answer}`}</strong><p>{question.explanation}</p>{!result.correct && <><p className="error-reason">错误原因：{question.errorReason}</p><button className="inline-link" onClick={() => onNavigatePoint(question.knowledgePointId)}>回到知识点：{pointTitle}</button></>}</div>}
  </article>
}

