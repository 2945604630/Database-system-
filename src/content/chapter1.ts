export type DiagramKind = 'evolution' | 'model-triad' | 'model-compare' | 'three-levels' | 'architecture'
export type QuestionType = 'single' | 'multiple' | 'true-false' | 'fill'

export type PracticeQuestion = {
  id: string
  sectionId: string
  type: QuestionType
  prompt: string
  options?: string[]
  answer: string | string[]
  acceptedAnswers?: string[]
  explanation: string
  errorReason: string
  knowledgePointId: string
  source: '教材原题' | 'Agent补充题'
  sourceDetail: string
}

export type KnowledgePoint = {
  id: string
  sectionId: string
  sectionTitle: string
  title: string
  type: '概念' | '演进' | '模型' | '结构' | '系统' | '流程' | '规则'
  summary: string
  definition: string
  remember: string[]
  detail: string[]
  markers?: ('考试重点' | '易错点')[]
  keywords: string[]
  source: string
  sourceType: '教材内容' | '教材补充'
  diagram?: DiagramKind
  example?: { prompt: string; answer: string; explanation: string; sourceType: '教材内容' | '教材补充' }
}

export type ChapterSection = {
  id: string
  title: string
  shortTitle: string
  points: KnowledgePoint[]
}

const source = '《数据库系统概论（第6版）》第1章'

export const sections: ChapterSection[] = [
  {
    id: '1-1', title: '1.1 数据库系统概述', shortTitle: '数据库系统概述', points: [
      {
        id: '1-1-1', sectionId: '1-1', sectionTitle: '1.1 数据库系统概述', title: '数据：被记录的事实', type: '概念',
        summary: '数据是描述事物的符号记录，数字、文字、图形、图像、声音和视频都可以是数据。',
        definition: '数据是数据库中存储的基本对象。数据的含义不能脱离语境单独理解，同一个值在不同记录中可能代表不同的事实。',
        remember: ['数据是数据库中的基本对象。', '数据 + 语义，才构成可理解的信息。'],
        detail: ['教材用学生记录说明：学号、姓名、性别、出生日期和主修专业组合起来，才完整描述一个学生。', '数据具有多种表现形式，现代数据库不只处理数值，也处理文本、图像、音频和视频等多媒体数据。'],
        keywords: ['数据', '信息', '记录'], source, sourceType: '教材内容', markers: ['易错点'],
        example: { prompt: '“20180003”单独出现时是什么？放在学生记录中又是什么？', answer: '单独看是数据值，放进带有学号语义的记录中才明确表示一个学生的学号。', explanation: '不要把一个数值本身等同于它在业务语境中的含义。', sourceType: '教材补充' },
      },
      {
        id: '1-1-2', sectionId: '1-1', sectionTitle: '1.1 数据库系统概述', title: '数据库：可共享的数据集合', type: '概念',
        summary: '数据库是长期存储在计算机内、有组织、可共享的大量数据集合。',
        definition: '数据库中的数据按照一定的数据模型组织、描述和存储，具有较小的数据冗余、较高的数据独立性和可扩展性，并可为多个用户共享。',
        remember: ['关键词：长期、有组织、可共享。', '数据库不仅是文件堆，而是按模型组织起来的数据集合。'],
        detail: ['数据库的结构化让数据可以被多个应用通过不同接口使用。共享与冗余控制是数据库相较于早期文件管理的重要优势。'],
        keywords: ['数据库', '共享', '冗余', '数据独立性'], source, sourceType: '教材内容', markers: ['考试重点'],
      },
      {
        id: '1-1-3', sectionId: '1-1', sectionTitle: '1.1 数据库系统概述', title: '数据库管理系统：管理数据的软件', type: '概念',
        summary: '数据库管理系统（DBMS）负责定义、组织、存储、操纵、保护和维护数据库。',
        definition: 'DBMS 是位于用户与操作系统之间、专门管理数据库的软件系统。它通过数据定义语言、数据操纵语言和事务管理等机制提供统一的数据管理能力。',
        remember: ['DBMS 是软件，不是数据库本身。', '主要能力：定义、组织存储、操纵、事务管理、保护、维护。'],
        detail: ['教材列出的主要功能包括数据定义、数据组织/存储/管理、数据操纵、数据库事务管理和运行管理、数据库建立和维护，以及与其他软件的通信。', '可把 DBMS 理解成数据库的“操作系统”，但它只负责数据管理领域，不能替代通用操作系统。'],
        keywords: ['DBMS', '数据库管理系统', 'DDL', 'DML', '事务'], source, sourceType: '教材内容', markers: ['考试重点', '易错点'],
      },
      {
        id: '1-1-4', sectionId: '1-1', sectionTitle: '1.1 数据库系统概述', title: '数据库系统：围绕数据库的完整环境', type: '概念',
        summary: '数据库系统（DBS）由数据库、DBMS、应用系统和数据库管理员等组成。',
        definition: '数据库系统是引入数据库后的计算机系统，通常包括数据库、数据库管理系统及其应用开发工具、应用系统和数据库管理员。',
        remember: ['DBS = 数据库 + DBMS + 应用系统 + 数据库管理员。', '数据库是被管理的对象，DBMS 是管理软件，DBS 是完整系统。'],
        detail: ['数据库系统的价值不只来自软件，还来自数据组织方式、应用系统、人员分工和运行管理的组合。', '考试题经常把 DB、DBMS 和 DBS 混在一起，先问“对象、软件还是完整环境”即可快速区分。'],
        keywords: ['DBS', '数据库系统', 'DBA', '应用系统'], source, sourceType: '教材内容', markers: ['考试重点', '易错点'],
      },
      {
        id: '1-1-5', sectionId: '1-1', sectionTitle: '1.1 数据库系统概述', title: '数据管理技术的三阶段演进', type: '演进',
        summary: '人工管理 → 文件系统 → 数据库系统，变化核心是数据组织方式、共享程度和独立性。',
        definition: '数据管理技术经历人工管理、文件系统和数据库系统三个阶段。数据库系统阶段面向组织或企业的多种应用，提供结构化、共享、受控的数据管理。',
        remember: ['人工管理：数据不保存、程序管理数据、数据无独立性。', '文件系统：数据可长期保存，但文件与程序耦合、共享性差。', '数据库系统：结构化、共享、独立性、统一管理。'],
        detail: ['人工管理阶段的主要矛盾是数据和程序强绑定；文件系统阶段解决了持久化，却出现数据冗余、更新不一致和数据孤立；数据库系统用统一的数据模型与 DBMS 缓解这些问题。', '这是理解数据库为何出现的因果链，而不是简单的年代背诵。'],
        keywords: ['人工管理', '文件系统', '数据库系统', '数据独立性', '数据冗余'], source, sourceType: '教材内容', diagram: 'evolution', markers: ['考试重点'],
      },
    ],
  },
  {
    id: '1-2', title: '1.2 数据模型', shortTitle: '数据模型', points: [
      {
        id: '1-2-1', sectionId: '1-2', sectionTitle: '1.2 数据模型', title: '数据建模：从现实世界到数据库', type: '模型',
        summary: '数据建模把现实对象抽象成概念模型，再转换成数据库管理系统支持的数据模型。',
        definition: '数据建模通常分为两步：先把现实世界抽象为信息世界的概念模型，再把概念模型转换为机器世界的数据库系统支持的数据模型。',
        remember: ['现实世界 → 信息世界 → 机器世界。', '建模是抽象与转换，不是把现实原样搬进数据库。'],
        detail: ['概念模型面向用户和数据库设计人员，强调对象、属性与联系；数据模型面向数据库系统，强调可实现的结构、操作和约束。', '教材图 1.7 用“知识抽象”展示了从现实世界到概念模型、再到数据库管理系统支持的数据模型的过程。'],
        keywords: ['数据建模', '概念模型', '数据模型', '现实世界', '信息世界', '机器世界'], source, sourceType: '教材内容', diagram: 'model-triad', markers: ['考试重点'],
      },
      {
        id: '1-2-2', sectionId: '1-2', sectionTitle: '1.2 数据模型', title: '概念模型：先描述业务世界', type: '模型',
        summary: '概念模型是面向用户和设计人员的现实世界抽象，常用实体、属性和联系表达。',
        definition: '概念模型是对现实世界中客观对象及其联系的抽象，常用实体、属性、实体型、实体集和联系等概念描述。E-R 模型是常用的概念模型。',
        remember: ['实体：客观存在并可相互区别的事物。', '属性：实体具有的某一特征。', '联系：实体内部或实体之间的关联。'],
        detail: ['教材使用“学生”和“课程”说明多对多联系：一个学生可以选多门课，一门课也可以被多名学生选修。', '概念模型的作用是把业务人员理解的对象关系表达为设计人员和用户都能沟通的共同语言。'],
        keywords: ['概念模型', '实体', '属性', '联系', 'E-R模型'], source, sourceType: '教材内容', markers: ['考试重点'],
        example: { prompt: '在“学生选课”场景中，学生、课程和选课分别是什么？', answer: '学生和课程是实体；姓名、学号、课程名是属性；选课是学生与课程之间的联系。', explanation: '联系不是第三个实体名称，而是实体之间发生的业务关系。', sourceType: '教材补充' },
      },
      {
        id: '1-2-3', sectionId: '1-2', sectionTitle: '1.2 数据模型', title: '数据模型的三要素', type: '模型',
        summary: '任何数据模型都要回答：数据怎么组织、能怎么操作、必须满足什么约束。',
        definition: '数据模型通常由数据结构、数据操作和完整性约束三部分组成。数据结构描述对象及其联系；数据操作规定允许的操作和规则；完整性约束规定数据必须遵守的约束。',
        remember: ['数据结构 = 长什么样。', '数据操作 = 能做什么。', '完整性约束 = 不能违反什么。'],
        detail: ['教材强调三要素共同描述一个数据模型：只看表结构不够，还要理解查询/更新能力和数据正确性条件。', '可以用“地图、动作规则、交通规则”类比三要素，但类比只是教材补充。'],
        keywords: ['数据结构', '数据操作', '完整性约束', '三要素'], source, sourceType: '教材内容', diagram: 'model-triad', markers: ['考试重点', '易错点'],
      },
      {
        id: '1-2-4', sectionId: '1-2', sectionTitle: '1.2 数据模型', title: '层次模型：用树组织记录', type: '模型',
        summary: '层次模型把记录组织成树，双亲记录与子记录之间是一对多联系。',
        definition: '层次模型用树形结构表示各类实体及实体间的联系。一个结点表示一个记录类型，结点间的连线表示记录类型之间的一对多联系。',
        remember: ['只有一个根结点。', '除根结点外，每个结点只有一个双亲结点。', '结构清晰、查询效率高，但不适合表达多对多关系。'],
        detail: ['教材指出层次模型的主要优点是结构简单清晰、查询效率高、完整性约束较好；缺点是非层次关系难表达，插入/删除时可能需要冗余数据或虚拟结点。', '层次模型把关系固定进树中，路径清楚但结构刚性较强。'],
        keywords: ['层次模型', '树', '双亲结点', '子结点', '一对多'], source, sourceType: '教材内容', diagram: 'model-compare', markers: ['考试重点'],
      },
      {
        id: '1-2-5', sectionId: '1-2', sectionTitle: '1.2 数据模型', title: '网状模型：允许多种路径', type: '模型',
        summary: '网状模型是层次模型的扩展，允许一个结点有多个双亲结点，能直接表达多对多联系。',
        definition: '网状模型用有向图结构表示实体及其联系，允许一个结点有多个双亲结点，也允许一个结点有多个子结点。DBTG/CODASYL 是其代表性系统。',
        remember: ['结构比层次模型更灵活。', '一个结点可以有多个双亲。', '访问依赖路径，应用程序负担较重。'],
        detail: ['教材用“学生选课”说明网状模型可以让学生与课程之间通过“学生选课”记录类型直接形成多对多联系。', '网状模型的代价是结构和数据操纵语言更复杂，用户需要理解存取路径。'],
        keywords: ['网状模型', 'DBTG', 'CODASYL', '多对多', '存取路径'], source, sourceType: '教材内容', diagram: 'model-compare', markers: ['易错点'],
      },
      {
        id: '1-2-6', sectionId: '1-2', sectionTitle: '1.2 数据模型', title: '关系模型：用二维表描述关系', type: '模型',
        summary: '关系模型把数据组织成规范化的二维表，用集合运算和谓词逻辑支持查询。',
        definition: '关系模型建立在严格的数学概念基础上，关系就是一张规范化的二维表。表中的行称为元组，列称为属性，属性取值来自相应的域。',
        remember: ['关系 = 二维表；元组 = 行；属性 = 列。', '域是具有相同数据类型的值的集合。', '关系模型要求每个分量是不可再分的数据项。'],
        detail: ['教材还介绍码、分量、关系模式等术语：码是能唯一确定一个元组的属性或属性组；关系模式通常写成关系名（属性1，属性2，…）。', '关系模型把存取路径细节隐藏起来，用户关注“是什么、要什么”，而不是“怎么走”。'],
        keywords: ['关系模型', '关系', '元组', '属性', '域', '码', '关系模式', '规范化'], source, sourceType: '教材内容', diagram: 'model-compare', markers: ['考试重点', '易错点'],
        example: { prompt: '在学生表中，“姓名”是元组还是属性？一名学生的一整行是什么？', answer: '姓名是属性；一名学生的一整行是元组。', explanation: '记忆口诀：列属性，行元组。', sourceType: '教材补充' },
      },
      {
        id: '1-2-7', sectionId: '1-2', sectionTitle: '1.2 数据模型', title: '不断涌现的新型数据模型', type: '模型',
        summary: '随着应用变化，键值、文档、图、时序、空间和多媒体等模型不断出现。',
        definition: '数据库系统会根据数据类型、应用需求和技术发展出现新的数据结构与数据模型，如键值模型、文档模型、图模型、时序模型、空间数据库模型和多媒体数据模型。',
        remember: ['新模型仍要面对结构、操作和完整性问题。', '新型模型不是“关系模型被完全替代”，而是面向不同场景的补充。'],
        detail: ['教材把这些模型放在数据模型演进中介绍，重点是认识数据库技术会随着数据形态和应用需求变化而扩展。', '“哪个模型最好”没有脱离场景的答案，应看数据结构、查询方式和一致性需求。'],
        keywords: ['键值模型', '文档模型', '图数据库', '时序数据库', '空间数据库', '多媒体'], source, sourceType: '教材内容', markers: ['易错点'],
      },
    ],
  },
  {
    id: '1-3', title: '1.3 数据库系统的三级模式结构', shortTitle: '三级模式结构', points: [
      {
        id: '1-3-1', sectionId: '1-3', sectionTitle: '1.3 数据库系统的三级模式结构', title: '模式与实例不是一回事', type: '结构',
        summary: '模式是数据库的逻辑结构与特征描述，实例是某一时刻模式对应的具体值。',
        definition: '模式是数据库中全体数据的逻辑结构和特征的描述，只涉及型而不涉及值；实例是模式的一个具体值，反映数据库某一时刻的状态。',
        remember: ['模式相对稳定，实例随时间变化。', '模式描述“结构和联系”，实例描述“某一时刻的内容”。'],
        detail: ['教材用“2019 年学生选课”和“2020 年学生选课”说明：数据库模式可能不变，但学生退选、转专业等会让实例发生变化。', '这一区分是理解三级模式与数据库设计的基础。'],
        keywords: ['模式', '实例', 'schema', 'instance'], source, sourceType: '教材内容', markers: ['考试重点', '易错点'],
      },
      {
        id: '1-3-2', sectionId: '1-3', sectionTitle: '1.3 数据库系统的三级模式结构', title: '三级模式：外模式、模式、内模式', type: '结构',
        summary: '三级模式从用户视图、全局逻辑结构、物理存储三个抽象层次描述数据库。',
        definition: '数据库系统的三级模式结构由外模式、模式和内模式构成。模式是全局逻辑结构；外模式是用户能看到和使用的局部逻辑结构；内模式是数据的物理存储结构和存取方法。',
        remember: ['外模式：面向用户和应用。', '模式：面向全体用户的逻辑结构。', '内模式：面向物理存储和访问。'],
        detail: ['数据库只有一个模式和一个内模式，但可以有多个外模式。一个应用通常对应一个外模式，多个应用也可共享一个外模式。', '三级模式把不同用户看到的局部视图、数据库全局逻辑结构和底层存储细节分开。'],
        keywords: ['外模式', '模式', '内模式', '三级模式', '用户视图'], source, sourceType: '教材内容', diagram: 'three-levels', markers: ['考试重点'],
      },
      {
        id: '1-3-3', sectionId: '1-3', sectionTitle: '1.3 数据库系统的三级模式结构', title: '两级映像带来数据独立性', type: '结构',
        summary: '外模式/模式映像与模式/内模式映像隔离了应用与逻辑结构、逻辑结构与存储结构。',
        definition: '外模式/模式映像定义外模式与模式之间的对应关系；模式/内模式映像定义模式与内模式之间的对应关系。它们使数据库具有较强的逻辑独立性和物理独立性。',
        remember: ['逻辑独立性：模式改变，外模式和应用尽量不变。', '物理独立性：内模式改变，模式和应用尽量不变。', '映像是“隔离变化”的桥。'],
        detail: ['逻辑独立性对应外模式/模式映像：增加关系、属性或改变联系时，数据库管理员调整映像，应用不必全部修改。', '物理独立性对应模式/内模式映像：改变存储结构、索引或组织方式时，逻辑模式和应用尽量不受影响。'],
        keywords: ['两级映像', '数据独立性', '逻辑独立性', '物理独立性'], source, sourceType: '教材内容', diagram: 'three-levels', markers: ['考试重点', '易错点'],
      },
    ],
  },
  {
    id: '1-4', title: '1.4 数据库系统的组成', shortTitle: '系统组成', points: [
      {
        id: '1-4-1', sectionId: '1-4', sectionTitle: '1.4 数据库系统的组成', title: '数据库系统由平台、软件和人组成', type: '系统',
        summary: '数据库系统不仅是 DBMS，还包括硬件平台、软件平台、数据库、应用系统和相关人员。',
        definition: '数据库系统由数据库、数据库管理系统及其应用开发工具、应用系统和数据库管理员等组成；运行还依赖硬件平台、软件平台和不同角色的协作。',
        remember: ['硬件平台：存储与计算基础。', '软件平台：操作系统、DBMS、开发工具和应用软件。', '人员：DBA、系统分析员、数据库设计员、应用程序员、最终用户。'],
        detail: ['DBA 负责设计定义数据库、帮助用户使用、监督运行、改进性能、转储恢复和重构数据库。系统分析员与数据库设计员负责需求与结构设计，应用程序员负责外模式之上的应用，最终用户通过应用系统完成业务。'],
        keywords: ['数据库系统组成', '硬件平台', '软件平台', 'DBA', '最终用户'], source, sourceType: '教材内容', diagram: 'architecture', markers: ['考试重点'],
      },
    ],
  },
  {
    id: '1-5', title: '1.5 数据库系统的体系结构', shortTitle: '体系结构', points: [
      {
        id: '1-5-1', sectionId: '1-5', sectionTitle: '1.5 数据库系统的体系结构', title: '按系统结构认识数据库', type: '系统',
        summary: '数据库体系结构可从系统部署与计算组织看成集中式、客户-服务器、并行、分布式和云数据库系统。',
        definition: '根据计算机系统结构，数据库系统可分为集中式数据库系统、客户-服务器数据库系统、并行数据库系统、分布式数据库系统和云数据库系统。',
        remember: ['集中式：数据与应用主要在同一计算机系统中。', '客户-服务器：服务器管理数据，客户端发出请求。', '分布式：数据在多个网络节点上逻辑统一。', '云数据库：按服务方式提供数据库能力。'],
        detail: ['客户-服务器结构通过网络分工降低客户端负担；并行数据库利用多处理器并行处理提高性能；分布式数据库强调数据逻辑整体性与物理分布；云数据库以服务方式提供存储、更新、查询和事务管理。', '这些是体系结构的部署视角，不要与数据模型的层次/网状/关系混为一谈。'],
        keywords: ['集中式', '客户-服务器', '并行数据库', '分布式数据库', '云数据库'], source, sourceType: '教材内容', diagram: 'architecture', markers: ['考试重点', '易错点'],
      },
    ],
  },
]

export const knowledgePoints = sections.flatMap((section) => section.points)

export const practiceQuestions: PracticeQuestion[] = [
  { id: 'q-1', sectionId: '1-1', type: 'multiple', prompt: '下列哪些属于数据库系统的组成部分？', options: ['数据库', '数据库管理系统', '应用系统', '数据库管理员'], answer: ['数据库', '数据库管理系统', '应用系统', '数据库管理员'], explanation: '数据库系统是完整环境，不等同于数据库或 DBMS 单独一个对象。', errorReason: '把数据库系统误解成单一软件或单一数据文件。', knowledgePointId: '1-1-4', source: '教材原题', sourceDetail: '第1章习题第1题' },
  { id: 'q-2', sectionId: '1-1', type: 'single', prompt: '文件系统阶段相较人工管理阶段，最重要的变化是？', options: ['数据可以长期保存', '所有应用共享同一数据模型', '完全消除数据冗余', '不再需要应用程序'], answer: '数据可以长期保存', explanation: '文件系统解决了数据持久化，但仍存在程序与文件耦合、共享性差等问题。', errorReason: '把文件系统的改进夸大成数据库系统的能力。', knowledgePointId: '1-1-5', source: '教材原题', sourceDetail: '第1章习题第2题' },
  { id: 'q-3', sectionId: '1-1', type: 'true-false', prompt: 'DBMS 就是数据库，二者可以互换。', options: ['正确', '错误'], answer: '错误', explanation: '数据库是被管理的数据集合，DBMS 是管理数据库的软件。', errorReason: '混淆“数据对象”和“管理软件”。', knowledgePointId: '1-1-3', source: 'Agent补充题', sourceDetail: '概念辨析' },
  { id: 'q-4', sectionId: '1-2', type: 'multiple', prompt: '数据模型通常包含哪些基本要素？', options: ['数据结构', '数据操作', '完整性约束', '屏幕配色'], answer: ['数据结构', '数据操作', '完整性约束'], explanation: '三要素分别回答数据怎么组织、能如何操作和必须满足哪些约束。', errorReason: '把界面表现层内容误认为数据模型要素。', knowledgePointId: '1-2-3', source: '教材原题', sourceDetail: '第1章习题第8题' },
  { id: 'q-5', sectionId: '1-2', type: 'single', prompt: '在关系模型中，一行数据通常称为？', options: ['属性', '元组', '域', '关系模式'], answer: '元组', explanation: '关系是一张二维表，行是元组，列是属性。', errorReason: '把行列术语颠倒。', knowledgePointId: '1-2-6', source: '教材原题', sourceDetail: '第1章习题第12题' },
  { id: 'q-6', sectionId: '1-2', type: 'true-false', prompt: '层次模型天然适合表达任意多对多联系。', options: ['正确', '错误'], answer: '错误', explanation: '层次模型以树组织记录，天然表达一对多；多对多关系需要额外处理。', errorReason: '忽略树结构对联系类型的限制。', knowledgePointId: '1-2-4', source: '教材原题', sourceDetail: '第1章习题第9题' },
  { id: 'q-7', sectionId: '1-2', type: 'fill', prompt: '在数据模型三要素中，描述数据对象及其联系的是 ______。', answer: '数据结构', acceptedAnswers: ['数据结构'], explanation: '数据结构描述对象类型、对象间联系以及数据组织方式。', errorReason: '把“能做什么”的数据操作与“长什么样”的数据结构混淆。', knowledgePointId: '1-2-3', source: 'Agent补充题', sourceDetail: '三要素快检' },
  { id: 'q-8', sectionId: '1-3', type: 'single', prompt: '数据库三级模式结构中，面向用户和应用的是？', options: ['外模式', '模式', '内模式', '物理文件'], answer: '外模式', explanation: '外模式是用户能够看到和使用的局部数据逻辑结构。', errorReason: '把全局逻辑结构或物理存储结构当成用户视图。', knowledgePointId: '1-3-2', source: '教材原题', sourceDetail: '第1章习题第14题' },
  { id: 'q-9', sectionId: '1-3', type: 'multiple', prompt: '下列关于数据独立性的说法正确的是？', options: ['物理独立性关注内模式变化', '逻辑独立性关注模式变化', '两级映像用于隔离变化', '数据独立性意味着数据永远不变'], answer: ['物理独立性关注内模式变化', '逻辑独立性关注模式变化', '两级映像用于隔离变化'], explanation: '数据独立性是结构变化时尽量减少上层应用修改，不是数据内容永远不变。', errorReason: '把“独立”误解为数据不发生变化。', knowledgePointId: '1-3-3', source: '教材原题', sourceDetail: '第1章习题第15题' },
  { id: 'q-10', sectionId: '1-4', type: 'single', prompt: '负责数据库日常运行、性能改进、转储恢复和重构的角色是？', options: ['最终用户', '应用程序员', '数据库管理员', '操作系统管理员'], answer: '数据库管理员', explanation: 'DBA 负责数据库全生命周期的运行管理与维护。', errorReason: '把业务使用、应用开发和数据库运行维护职责混在一起。', knowledgePointId: '1-4-1', source: '教材原题', sourceDetail: '第1章习题第16题' },
  { id: 'q-11', sectionId: '1-5', type: 'single', prompt: '数据库逻辑上是一个整体，但物理上分布在网络多个节点，这属于？', options: ['集中式数据库系统', '分布式数据库系统', '文件系统', '单机应用系统'], answer: '分布式数据库系统', explanation: '分布式数据库的数据分布在多个节点，但对用户可表现为逻辑整体。', errorReason: '只看到“逻辑整体”，忽略了“物理分布”条件。', knowledgePointId: '1-5-1', source: '教材原题', sourceDetail: '第1章习题第16题' },
]

