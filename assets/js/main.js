/**
 * 생명과학 학습 웹사이트 - 공통 JavaScript
 * 22개정 생명과학 (일반선택)
 */

/* ===================================================
   22개정 생명과학 단원 데이터
   =================================================== */
const BIOLOGY_UNITS = [
  {
    id: 1,
    romanNum: 'Ⅰ',
    title: '생명 과학의 이해',
    icon: '🔬',
    iconClass: 'blue',
    desc: '생명 과학의 특성과 탐구 방법을 이해한다.',
    lessons: [
      { id: '1-1', title: '생명 현상의 특성', type: '개념+영상' },
      { id: '1-2', title: '생명 과학의 탐구 방법', type: '실험' },
    ]
  },
  {
    id: 2,
    romanNum: 'Ⅱ',
    title: '세포의 구조와 기능',
    icon: '🧫',
    iconClass: 'green',
    desc: '세포의 구조와 각 세포 소기관의 기능을 탐구한다.',
    lessons: [
      { id: '2-1', title: '세포의 구조', type: '개념+영상' },
      { id: '2-2', title: '세포막을 통한 물질 이동', type: '실험' },
    ]
  },
  {
    id: 3,
    romanNum: 'Ⅲ',
    title: '물질대사',
    icon: '⚗️',
    iconClass: 'orange',
    desc: '효소의 작용 원리와 세포 호흡, 광합성을 탐구한다.',
    lessons: [
      { id: '3-1', title: '효소', type: '실험' },
      { id: '3-2', title: '세포 호흡', type: '개념+영상' },
      { id: '3-3', title: '광합성', type: '개념+영상' },
    ]
  },
  {
    id: 4,
    romanNum: 'Ⅳ',
    title: '유전자와 생명 공학',
    icon: '🧬',
    iconClass: 'purple',
    desc: 'DNA 구조와 유전 정보의 발현 과정을 이해한다.',
    lessons: [
      { id: '4-1', title: 'DNA와 유전자', type: '개념+영상' },
      { id: '4-2', title: '유전 정보의 발현', type: '개념+영상' },
      { id: '4-3', title: '생명 공학 기술', type: '개념' },
    ]
  },
  {
    id: 5,
    romanNum: 'Ⅴ',
    title: '생물의 진화와 다양성',
    icon: '🌿',
    iconClass: 'teal',
    desc: '생물의 분류 체계와 진화의 원리를 탐구한다.',
    lessons: [
      { id: '5-1', title: '생물의 분류', type: '개념' },
      { id: '5-2', title: '생물의 진화', type: '개념+영상' },
    ]
  },
  {
    id: 6,
    romanNum: 'Ⅵ',
    title: '인체의 구조와 기능',
    icon: '🫀',
    iconClass: 'blue',
    desc: '신경계, 호르몬, 면역의 작용 원리를 이해한다.',
    lessons: [
      { id: '6-1', title: '신경계', type: '개념+영상' },
      { id: '6-2', title: '호르몬과 항상성', type: '개념+영상' },
      { id: '6-3', title: '방어 작용', type: '개념+영상' },
    ]
  },
  {
    id: 7,
    romanNum: 'Ⅶ',
    title: '생태계와 상호 작용',
    icon: '🌍',
    iconClass: 'green',
    desc: '생태계의 구성과 에너지 흐름, 물질 순환을 탐구한다.',
    lessons: [
      { id: '7-1', title: '생태계의 구성과 기능', type: '개념' },
      { id: '7-2', title: '에너지 흐름과 물질 순환', type: '개념+영상' },
      { id: '7-3', title: '생물 다양성 보전', type: '개념' },
    ]
  }
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
    return BIOLOGY_UNITS.reduce((sum, u) => sum + u.lessons.length, 0);
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

    BIOLOGY_UNITS.forEach(unit => {
      const isOpen = this.currentLesson && unit.lessons.some(l => l.id === this.currentLesson);
      html += `
        <div class="unit-item">
          <div class="unit-title ${isOpen ? 'active open' : ''}" 
               onclick="Sidebar.toggleUnit(this)" 
               data-unit="${unit.id}">
            <span class="unit-num roman">${unit.romanNum}</span>
            <span>${unit.title}</span>
            <span class="chevron">▼</span>
          </div>
          <ul class="lesson-list ${isOpen ? 'open' : ''}">
            ${unit.lessons.map(lesson => {
              const done = prog[lesson.id]?.completed;
              const isCurrent = lesson.id === this.currentLesson;
              return `
                <li class="lesson-item ${isCurrent ? 'active' : ''}"
                    onclick="Sidebar.goLesson('${lesson.id}')">
                  <span class="lesson-dot"></span>
                  <span>${lesson.title}</span>
                  ${done ? '<span class="progress-badge">완료</span>' : ''}
                </li>
              `;
            }).join('')}
          </ul>
        </div>
      `;
    });

    container.innerHTML = html;
    Progress.updateUI();
  },

  toggleUnit(el) {
    const isOpen = el.classList.contains('open');
    // 모두 닫기
    document.querySelectorAll('.unit-title').forEach(t => {
      t.classList.remove('open', 'active');
      const list = t.nextElementSibling;
      if (list) list.classList.remove('open');
    });
    // 클릭한 것만 토글
    if (!isOpen) {
      el.classList.add('open', 'active');
      const list = el.nextElementSibling;
      if (list) list.classList.add('open');
    }
  },

  goLesson(lessonId) {
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
  for (const unit of BIOLOGY_UNITS) {
    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (lesson) return { unit, lesson };
  }
  return null;
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
