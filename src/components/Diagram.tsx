import type { DiagramKind } from '../content/chapter1'

export function Diagram({ kind }: { kind: DiagramKind }) {
  if (kind === 'evolution') {
    return <div className="diagram diagram-evolution" aria-label="数据管理技术三阶段演进图">
      <div className="diagram-axis"><span>管理能力</span><span>时间与共享范围</span></div>
      <div className="evolution-row"><div className="diagram-node muted"><b>人工管理</b><small>程序直接管理数据<br />数据不独立</small></div><span className="diagram-arrow">→</span><div className="diagram-node muted"><b>文件系统</b><small>可长期保存<br />文件与程序耦合</small></div><span className="diagram-arrow">→</span><div className="diagram-node accent"><b>数据库系统</b><small>结构化 · 共享<br />统一管理与独立性</small></div></div>
    </div>
  }
  if (kind === 'model-triad') {
    return <div className="diagram diagram-triad" aria-label="数据模型三要素图">
      <div className="triad-center">数据模型</div>
      <div className="triad-item triad-top"><b>数据结构</b><small>长什么样</small></div>
      <div className="triad-item triad-left"><b>数据操作</b><small>能做什么</small></div>
      <div className="triad-item triad-right"><b>完整性约束</b><small>不能违反什么</small></div>
    </div>
  }
  if (kind === 'model-compare') {
    return <div className="model-compare" aria-label="层次模型、网状模型和关系模型对比">
      <div className="compare-head"><span>模型</span><span>组织方式</span><span>一眼记忆</span></div>
      <div className="compare-row"><b>层次</b><span className="mini-tree">根 → 子 → 叶</span><span>树，结构清楚</span></div>
      <div className="compare-row"><b>网状</b><span className="mini-network">多路径相连</span><span>图，联系灵活</span></div>
      <div className="compare-row"><b>关系</b><span className="mini-table">行 × 列</span><span>表，面向集合</span></div>
    </div>
  }
  if (kind === 'three-levels') {
    return <div className="diagram diagram-levels" aria-label="数据库系统三级模式结构图">
      <div className="level-box"><small>用户视图</small><b>外模式</b><span>应用 A · 应用 B · 应用 C</span></div>
      <div className="level-bridge">外模式 / 模式映像</div>
      <div className="level-box accent"><small>全局逻辑结构</small><b>模式</b><span>完整数据库的逻辑关系</span></div>
      <div className="level-bridge">模式 / 内模式映像</div>
      <div className="level-box dark"><small>物理存储结构</small><b>内模式</b><span>文件、索引与存取路径</span></div>
    </div>
  }
  return <div className="diagram diagram-architecture" aria-label="数据库系统组成与体系结构图">
    <div className="architecture-layer"><span>硬件平台</span><span>软件平台</span><span>数据库</span></div>
    <div className="architecture-people"><span>DBA</span><span>设计与开发</span><span>最终用户</span></div>
    <div className="architecture-line" />
    <div className="architecture-types"><b>集中式</b><b>客户-服务器</b><b>并行</b><b>分布式</b><b>云数据库</b></div>
  </div>
}

