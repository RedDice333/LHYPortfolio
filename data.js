/*
  포트폴리오 내용 — 이 파일만 고치면 페이지가 바뀝니다.
  [대괄호] 안은 자리표시자입니다. 비워 두는 칸은 "" 또는 []로 두면 화면에서 빠집니다.
*/
window.PORTFOLIO = {
  profile: {
    name: "[이름]",
    role: "[직무 — 예: 시스템 기획]",
    headline: "[한 줄 포지셔닝]",
    intro: "[짧은 소개 2~3줄]",
    photo: "",                      // 예: "assets/photo.jpg" (비우면 빈 칸 표시)

    // 정보 상자 — 상자 이름과 행(항목·값)을 자유롭게 추가/삭제
    boxes: [
      {
        title: "연락",
        rows: [
          { k: "이메일", v: "[이메일]", href: "" },   // href 예: "mailto:me@example.com"
          { k: "GitHub", v: "[주소]", href: "" }
        ]
      },
      {
        title: "학력 · 경력",
        rows: [
          { k: "[기간]", v: "[학교 · 전공]" },
          { k: "[기간]", v: "[회사 · 역할]" }
        ]
      },
      {
        title: "도구",
        skills: ["[도구 A]", "[도구 B]", "[도구 C]"]
      }
    ]
  },

  /*
    작업 목록 — 카드 1장 = 올린 파일 1개
    - pdf: 카드를 누르면 새 탭에서 열리는 PDF · pages: 쪽수
    - no: 만든 순서 번호 (카드에 #번호로 표시, 큰 번호가 앞)
    - game: 대상 게임 · status: 제작 상태(비우면 숨김)
    - points: 카드에 보이는 줄 (PDF 목차 원문)
    - tags: 태그 바에 자동 수집. 같은 태그는 같은 글자로.
  */
  works: [
    {
      no: 3,
      title: "궁극기 스킬 개선 제안서",
      game: "명일방주: 엔드필드",
      pdf: "assets/pdf/endfield-combat.pdf",
      pages: "11p",
      status: "수정 진행 중",
      points: [
        "전투 시스템 분석 — 스킬 4종류 · 일반 공격 · 배틀 스킬 · 연계 스킬 · 궁극기 AS-IS",
        "전투 시스템 개선 제안 — 궁극기 동시 사용 · 연속 사용 · TO-BE · 언리얼 시연 영상",
        "부록 — DataTable 전체 명세표"
      ],
      tags: ["전투 기획", "언리얼"],
      thumb: "assets/thumbs/endfield-combat.jpg"
    },
    {
      no: 1,
      title: "시스템 + 밸런스",
      game: "The Division 2",
      pdf: "assets/pdf/division2-system-balance.pdf",
      pages: "39p",
      status: "",
      points: [
        "루터 슈터 상용 게임 시스템 분석 — 무기 시스템 역기획",
        "밸런스 시뮬레이션 — 전투 밸런스/경제 밸런스 시뮬레이션",
        "부록 — 마스터 테이블 · 언리얼 엔진 스크린샷 · 밸런스 시뮬레이터 · 거리 감쇄 실측"
      ],
      tags: ["시스템", "역기획", "밸런스", "데이터 테이블", "언리얼", "시뮬레이션", "루터 슈터"],
      thumb: "assets/thumbs/division2-system-balance.jpg"
    },
    {
      no: 2,
      title: "엔드필드 포트폴리오",
      game: "명일방주: 엔드필드",
      pdf: "assets/pdf/endfield-wip.pdf",
      pages: "14p",
      status: "폐기",
      points: [
        "오퍼레이터 — 오퍼레이터 시스템 분석",
        "오퍼레이터: 성장 — 성장 시스템 분석 · 성장 시스템 개선 제안 · 성장 콘텐츠 추가 분석"
      ],
      tags: ["시스템", "역기획", "성장", "경제", "UI · UX"],
      thumb: "assets/thumbs/endfield-wip.jpg"
    }
  ],

  footer: "© [이름]"
};
