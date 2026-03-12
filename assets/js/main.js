/**
 * 생명과학 학습 웹사이트 - 공통 JavaScript
 * 22개정 생명과학 (일반선택)
 */

/* ===================================================
   22개정 생명과학 단원 데이터
   =================================================== */
/* ===================================================
   22개정 생명과학 I 단원 구조
   대단원 3개 / 중단원 8개 / 소단원 26개
   =================================================== */

// 사이드바·진도 계산용 평탄화 데이터 (소단원 단위)
const BIOLOGY_UNITS = [

  /* ────────────────────────────────────────
     대단원 1. 생명 시스템의 구성
     ──────────────────────────────────────── */
  {
    id: '1-1',
    unitNum: '대단원 1',
    chapterNum: '중단원 1)',
    chapterTitle: '생명과학의 이해',
    icon: '🔬', iconClass: 'blue',
    lessons: [
      { id: '1-1-01', num: '01', title: '생물의 특성',           activity: '영상' },
      { id: '1-1-02', num: '02', title: '생명과학의 특성',        activity: '탐구' },
      { id: '1-1-03', num: '03', title: '생명 시스템의 구성 단계', activity: '영상' },
    ]
  },
  {
    id: '1-2',
    unitNum: '대단원 1',
    chapterNum: '중단원 2)',
    chapterTitle: '생명활동과 에너지',
    icon: '⚗️', iconClass: 'orange',
    lessons: [
      { id: '1-2-01', num: '01', title: '물질대사와 에너지전환',  activity: '실험' },
      { id: '1-2-02', num: '02', title: '기관계의 통합적 작용',   activity: '영상' },
      { id: '1-2-03', num: '03', title: '물질대사와 건강',        activity: '탐구' },
    ]
  },
  {
    id: '1-3',
    unitNum: '대단원 1',
    chapterNum: '중단원 3)',
    chapterTitle: '생태계와 상호작용',
    icon: '🌍', iconClass: 'green',
    lessons: [
      { id: '1-3-01', num: '01', title: '생태계의 구조',          activity: '탐구' },
      { id: '1-3-02', num: '02', title: '물질순환과 에너지흐름',   activity: '영상' },
      { id: '1-3-03', num: '03', title: '개체군',                 activity: '실험' },
      { id: '1-3-04', num: '04', title: '군집',                   activity: '탐구' },
    ]
  },

  /* ────────────────────────────────────────
     대단원 2. 항상성과 몸의 조절
     ──────────────────────────────────────── */
  {
    id: '2-1',
    unitNum: '대단원 2',
    chapterNum: '중단원 1)',
    chapterTitle: '신경자극전도와 시냅스전달',
    icon: '⚡', iconClass: 'purple',
    lessons: [
      { id: '2-1-01', num: '01', title: '신경자극전도',           activity: '영상' },
      { id: '2-1-02', num: '02', title: '시냅스전달',             activity: '영상' },
    ]
  },
  {
    id: '2-2',
    unitNum: '대단원 2',
    chapterNum: '중단원 2)',
    chapterTitle: '신경계와 항상성',
    icon: '🫀', iconClass: 'blue',
    lessons: [
      { id: '2-2-01', num: '01', title: '사람의 신경계',          activity: '영상' },
      { id: '2-2-02', num: '02', title: '항상성 유지',            activity: '실험' },
    ]
  },
  {
    id: '2-3',
    unitNum: '대단원 2',
    chapterNum: '중단원 3)',
    chapterTitle: '우리 몸의 방어 작용',
    icon: '🛡️', iconClass: 'teal',
    lessons: [
      { id: '2-3-01', num: '01', title: '병원체와 방어 작용',          activity: '영상' },
      { id: '2-3-02', num: '02', title: '항원항체반응과 혈액형',        activity: '실험' },
      { id: '2-3-03', num: '03', title: '백신의 작용 원리와 종류',      activity: '탐구' },
    ]
  },

  /* ────────────────────────────────────────
     대단원 3. 생명의 연속성과 다양성
     ──────────────────────────────────────── */
  {
    id: '3-1',
    unitNum: '대단원 3',
    chapterNum: '중단원 1)',
    chapterTitle: '염색체와 생식세포 형성',
    icon: '🧬', iconClass: 'purple',
    lessons: [
      { id: '3-1-01', num: '01', title: '염색체, DNA, 유전자',     activity: '영상' },
      { id: '3-1-02', num: '02', title: '생식세포 형성의 중요성',   activity: '실험' },
    ]
  },
  {
    id: '3-2',
    unitNum: '대단원 3',
    chapterNum: '중단원 2)',
    chapterTitle: '생물의 진화와 다양성',
    icon: '🌿', iconClass: 'teal',
    lessons: [
      { id: '3-2-01', num: '01', title: '생물의 진화',             activity: '영상' },
      { id: '3-2-02', num: '02', title: '식물의 분류체계',          activity: '탐구' },
      { id: '3-2-03', num: '03', title: '식물의 분류',              activity: '탐구' },
      { id: '3-2-04', num: '04', title: '동물의 분류',              activity: '탐구' },
    ]
  },
];

/* 대단원 메타 정보 */
const MAJOR_UNITS = [
  {
    id: 1, num: '대단원 1',
    title: '생명 시스템의 구성',
    icon: '🔬', iconClass: 'blue',
    desc: '생명과학의 이해, 생명활동과 에너지, 생태계와 상호작용을 탐구한다.',
    chapterIds: ['1-1','1-2','1-3'],
  },
  {
    id: 2, num: '대단원 2',
    title: '항상성과 몸의 조절',
    icon: '⚡', iconClass: 'purple',
    desc: '신경자극전도, 신경계와 항상성, 우리 몸의 방어 작용을 이해한다.',
    chapterIds: ['2-1','2-2','2-3'],
  },
  {
    id: 3, num: '대단원 3',
    title: '생명의 연속성과 다양성',
    icon: '🧬', iconClass: 'teal',
    desc: '염색체와 생식세포 형성, 생물의 진화와 다양성을 탐구한다.',
    chapterIds: ['3-1','3-2'],
  },
];

/* ===================================================
   세션 기반 진도/점수 관리
   =================================================== */
const Progress = {
  KEY: 'bio_progress',

  get() {
    try {
      return JSON.parse(sessionStorage.getItem(this.KEY)) || {};
    } catch { return {}; }
  },

  set(lessonId, data) {
    const prog = this.get();
    prog[lessonId] = { ...prog[lessonId], ...data, updatedAt: Date.now() };
    sessionStorage.setItem(this.KEY, JSON.stringify(prog));
    this.updateUI();
  },

  getLesson(lessonId) {
    return this.get()[lessonId] || {};
  },

  getTotalCompleted() {
    const prog = this.get();
    return Object.values(prog).filter(v => v.completed).length;
  },

  getTotalLessons() {
    return BIOLOGY_UNITS.reduce((sum, ch) => sum + ch.lessons.length, 0);
  },

  getPercent() {
    const total = this.getTotalLessons();
    return total === 0 ? 0 : Math.round((this.getTotalCompleted() / total) * 100);
  },

  updateUI() {
    const percent = this.getPercent();
    const completed = this.getTotalCompleted();
    const total = this.getTotalLessons();

    document.querySelectorAll('.progress-bar-fill').forEach(el => {
      el.style.width = percent + '%';
    });
    document.querySelectorAll('.progress-percent').forEach(el => {
      el.textContent = percent + '%';
    });
    document.querySelectorAll('.progress-completed').forEach(el => {
      el.textContent = `${completed} / ${total}`;
    });
  }
};

/* ===================================================
   사이드바 렌더링 & 토글
   =================================================== */
const Sidebar = {
  currentLesson: null,

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const prog = Progress.get();
    let html = '';

    // 대단원별로 그룹핑하여 렌더링
    MAJOR_UNITS.forEach(major => {
      const chapters = BIOLOGY_UNITS.filter(u => major.chapterIds.includes(u.id));
      const hasCurrentInMajor = chapters.some(ch => ch.lessons.some(l => l.id === this.currentLesson));

      html += `
        <div class="sidebar-major-item">
          <div class="sidebar-major-title ${hasCurrentInMajor ? 'open' : ''}"
               onclick="Sidebar.toggleMajor(this)">
            <span class="unit-num" style="font-size:10px;">${major.id}</span>
            <span>${major.title}</span>
            <span class="chevron">▼</span>
          </div>
          <div class="sidebar-major-body ${hasCurrentInMajor ? 'open' : ''}">
            ${chapters.map(chapter => {
              const isChapterOpen = chapter.lessons.some(l => l.id === this.currentLesson);
              return `
                <div class="unit-item">
                  <div class="unit-title ${isChapterOpen ? 'active open' : ''}"
                       onclick="Sidebar.toggleUnit(this)"
                       data-chapter="${chapter.id}">
                    <span class="unit-num roman" style="font-size:9px;width:18px;height:18px;">${chapter.chapterNum}</span>
                    <span style="font-size:12.5px;">${chapter.chapterTitle}</span>
                    <span class="chevron">▼</span>
                  </div>
                  <ul class="lesson-list ${isChapterOpen ? 'open' : ''}">
                    ${chapter.lessons.map(lesson => {
                      const done = prog[lesson.id]?.completed;
                      const isCurrent = lesson.id === this.currentLesson;
                      return `
                        <li class="lesson-item ${isCurrent ? 'active' : ''}"
                            onclick="Sidebar.goLesson('${lesson.id}')">
                          <span class="lesson-dot"></span>
                          <span>${lesson.num}. ${lesson.title}</span>
                          ${done ? '<span class="progress-badge">완료</span>' : ''}
                        </li>
                      `;
                    }).join('')}
                  </ul>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    Progress.updateUI();
  },

  toggleMajor(el) {
    const body = el.nextElementSibling;
    const isOpen = el.classList.contains('open');
    // 모두 닫기
    document.querySelectorAll('.sidebar-major-title').forEach(t => {
      t.classList.remove('open');
      if (t.nextElementSibling) t.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      el.classList.add('open');
      body?.classList.add('open');
    }
  },

  toggleUnit(el) {
    const isOpen = el.classList.contains('open');
    // 같은 대단원 안에서만 닫기
    el.closest('.sidebar-major-body')?.querySelectorAll('.unit-title').forEach(t => {
      t.classList.remove('open', 'active');
      const list = t.nextElementSibling;
      if (list) list.classList.remove('open');
    });
    if (!isOpen) {
      el.classList.add('open', 'active');
      const list = el.nextElementSibling;
      if (list) list.classList.add('open');
    }
  },

  goLesson(lessonId) {
    // pages/ 하위에서 호출 시 상대 경로 유지
    const isInPages = window.location.pathname.includes('/pages/');
    window.location.href = `lesson.html?lesson=${lessonId}`;
  },

  openMobile() {
    document.querySelector('.sidebar')?.classList.add('open');
    document.getElementById('sidebar-overlay')?.classList.add('visible');
  },

  closeMobile() {
    document.querySelector('.sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('visible');
  }
};

/* ===================================================
   탭 전환 (개념 / 시뮬레이션 / 형성평가)
   =================================================== */
const Tabs = {
  init() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        this.show(target);
      });
    });

    // URL 파라미터로 탭 결정
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') || 'concept';
    this.show(tab);
  },

  show(tabId) {
    // 버튼
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    // 콘텐츠
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = content.id === `tab-${tabId}` ? 'block' : 'none';
    });

    // URL 업데이트 (히스토리 오염 없이)
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    history.replaceState(null, '', url.toString());
  }
};

/* ===================================================
   형성평가 (퀴즈) 엔진
   =================================================== */
const Quiz = {
  answers: {},    // { questionId: selectedChoice }
  submitted: false,

  init() {
    this.bindEvents();
  },

  bindEvents() {
    // 선택지 클릭
    document.querySelectorAll('.choice-item').forEach(item => {
      item.addEventListener('click', () => {
        if (this.submitted) return;
        const qId = item.closest('.question-card').dataset.qid;
        const val  = item.dataset.choice;
        this.select(qId, val, item);
      });
    });

    // 제출 버튼
    document.getElementById('quiz-submit')?.addEventListener('click', () => {
      this.submit();
    });

    // 다시 풀기 버튼
    document.getElementById('quiz-retry')?.addEventListener('click', () => {
      this.reset();
    });
  },

  select(qId, choice, el) {
    // 같은 문제의 다른 선택지 해제
    el.closest('.question-card')
      .querySelectorAll('.choice-item')
      .forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    this.answers[qId] = choice;

    // 번호 아이콘 업데이트
    el.closest('.question-card')
      .querySelectorAll('.choice-item')
      .forEach(c => {
        c.querySelector('.choice-num').textContent = c.dataset.choiceNum;
      });
    el.querySelector('.choice-num').textContent = '✓';
  },

  submit() {
    const questions = document.querySelectorAll('.question-card');
    const unanswered = [...questions].filter(q => !this.answers[q.dataset.qid]);

    if (unanswered.length > 0) {
      this.showAlert(`아직 ${unanswered.length}문제가 선택되지 않았습니다.`);
      unanswered[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    this.submitted = true;
    let correct = 0;

    questions.forEach(card => {
      const qId     = card.dataset.qid;
      const answer  = card.dataset.answer;
      const selected = this.answers[qId];
      const isCorrect = selected === answer;
      if (isCorrect) correct++;

      // 선택지 스타일 변경
      card.querySelectorAll('.choice-item').forEach(c => {
        c.classList.remove('selected');
        if (c.dataset.choice === answer) {
          c.classList.add('correct');
          c.querySelector('.choice-num').textContent = '✓';
        }
        if (c.dataset.choice === selected && !isCorrect) {
          c.classList.add('wrong');
        }
      });

      // 피드백 박스 표시
      const feedback = card.querySelector('.feedback-box');
      if (feedback) {
        feedback.classList.add('visible');
        feedback.classList.add(isCorrect ? 'correct-feedback' : 'wrong-feedback');
      }
    });

    // 점수 패널
    this.showScore(correct, questions.length);
    document.getElementById('quiz-submit').style.display = 'none';

    // 진도 저장
    const params = new URLSearchParams(window.location.search);
    const lessonId = params.get('lesson');
    if (lessonId) {
      Progress.set(lessonId, {
        quizScore: correct,
        quizTotal: questions.length,
        completed: true
      });
    }
  },

  showScore(correct, total) {
    const panel = document.getElementById('score-panel');
    if (!panel) return;

    panel.querySelector('.score-num').textContent = correct;
    panel.querySelector('.score-total').textContent = `/ ${total}`;
    panel.querySelector('.correct-count .score-count').textContent = correct;
    panel.querySelector('.wrong-count .score-count').textContent = total - correct;

    const pct = Math.round((correct / total) * 100);
    let msg, emoji;
    if (pct === 100)     { msg = '완벽합니다! 모든 개념을 정확히 이해했어요.'; emoji = '🎉'; }
    else if (pct >= 80)  { msg = '훌륭해요! 핵심 개념을 잘 이해하고 있어요.'; emoji = '👍'; }
    else if (pct >= 60)  { msg = '조금 더 복습이 필요합니다. 틀린 문제를 다시 확인해보세요.'; emoji = '📖'; }
    else                 { msg = '개념 부분을 다시 학습하고 도전해보세요!'; emoji = '💪'; }

    panel.querySelector('.score-message').textContent = `${emoji} ${msg}`;
    panel.querySelector('.score-percent').textContent = `정답률: ${pct}%`;
    panel.classList.add('visible');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  reset() {
    this.answers = {};
    this.submitted = false;

    document.querySelectorAll('.choice-item').forEach(c => {
      c.classList.remove('selected', 'correct', 'wrong');
      c.querySelector('.choice-num').textContent = c.dataset.choiceNum;
    });
    document.querySelectorAll('.feedback-box').forEach(f => {
      f.classList.remove('visible', 'correct-feedback', 'wrong-feedback');
    });
    document.getElementById('score-panel')?.classList.remove('visible');
    document.getElementById('quiz-submit').style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showAlert(msg) {
    const alert = document.createElement('div');
    alert.style.cssText = `
      position:fixed; top:80px; left:50%; transform:translateX(-50%);
      background:#1a8dcb; color:#fff; padding:12px 24px; border-radius:30px;
      font-size:14px; font-weight:600; z-index:9999;
      box-shadow:0 4px 20px rgba(26,141,203,0.4);
      animation: fadeInUp 0.3s ease;
    `;
    alert.textContent = msg;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 2500);
  }
};

/* ===================================================
   유틸리티
   =================================================== */
function getLessonData(lessonId) {
  for (const chapter of BIOLOGY_UNITS) {
    const lesson = chapter.lessons.find(l => l.id === lessonId);
    if (lesson) {
      const major = MAJOR_UNITS.find(m => m.chapterIds.includes(chapter.id));
      return { major, chapter, lesson };
    }
  }
  return null;
}

// 전체 소단원 수 (진도 계산용)
function getTotalLessons() {
  return BIOLOGY_UNITS.reduce((sum, ch) => sum + ch.lessons.length, 0);
}

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/* ===================================================
   페이지 초기화
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 현재 레슨 파악
  const lessonId = getQueryParam('lesson');
  if (lessonId) Sidebar.currentLesson = lessonId;

  // 사이드바 렌더링
  if (document.getElementById('sidebar-nav')) {
    Sidebar.render('sidebar-nav');
  }

  // 탭 초기화
  if (document.querySelector('.tab-btn')) {
    Tabs.init();
  }

  // 퀴즈 초기화
  if (document.querySelector('.question-card')) {
    Quiz.init();
  }

  // 모바일 햄버거
  document.getElementById('menu-toggle')?.addEventListener('click', Sidebar.openMobile);
  document.getElementById('sidebar-overlay')?.addEventListener('click', Sidebar.closeMobile);

  // 진도 UI
  Progress.updateUI();
});
