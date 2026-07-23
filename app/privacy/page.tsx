export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-black md:px-10 md:py-24">
      <h1 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">
        개인정보처리방침
      </h1>

      <div className="flex flex-col gap-8 text-sm leading-7 text-black/80">
        <p>
          (주)도호엔터테인먼트(이하 "회사")는 이용자의 개인정보를 중요시하며,
          「개인정보보호법」 등 관련 법령을 준수하고 있습니다. 회사는
          개인정보처리방침을 통해 이용자가 제공하는 개인정보가 어떠한
          목적과 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한
          조치가 취해지고 있는지 알려드립니다.
        </p>

        <section>
          <h2 className="mb-2 text-base font-bold">
            1. 수집하는 개인정보 항목 및 수집 방법
          </h2>
          <p>
            회사는 문의하기, 채용 지원 등의 서비스 제공을 위해 아래와 같은
            개인정보를 수집합니다.
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>필수항목: 이름, 이메일 주소, 연락처, 문의 내용</li>
            <li>선택항목: 소속, 첨부파일(포트폴리오, 이력서 등)</li>
            <li>
              수집 방법: 홈페이지 내 문의 폼, 채용 지원 폼을 통한 이용자의
              직접 입력
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">2. 개인정보의 수집 및 이용목적</h2>
          <p>
            수집한 개인정보는 문의 응대, 채용 절차 진행, 서비스 관련 안내 및
            공지사항 전달 목적으로만 이용되며, 목적 외 용도로 이용되지
            않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">3. 개인정보의 보유 및 이용기간</h2>
          <p>
            회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를
            지체 없이 파기합니다. 단, 관계 법령의 규정에 의하여 보존할 필요가
            있는 경우 회사는 관계 법령에서 정한 일정한 기간 동안 회원정보를
            보관합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">4. 개인정보의 제3자 제공</h2>
          <p>
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
            다만, 이용자가 사전에 동의한 경우이거나 법령의 규정에 의거한
            경우는 예외로 합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">5. 개인정보의 파기절차 및 방법</h2>
          <p>
            전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는
            기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로
            분쇄하거나 소각하는 방법으로 파기합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">6. 이용자 및 법정대리인의 권리와 행사 방법</h2>
          <p>
            이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리
            정지를 요청할 수 있으며, 회사는 이에 대해 지체 없이 필요한 조치를
            취합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">7. 개인정보 보호책임자</h2>
          <p>
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>개인정보 보호책임자: (강병화)</li>
            <li>연락처: (0262639171)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">8. 개인정보처리방침의 변경</h2>
          <p>
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
            변경내용의 추가, 삭제 및 정정이 있는 경우에는 개정 최소 7일 전부터
            공지사항을 통하여 고지할 것입니다.
          </p>
        </section>

        <section>
          <p className="text-black/50">
            공고일자: 2026년 1월 1일 / 시행일자: 2026년 1월 1일
          </p>
        </section>
      </div>
    </main>
  );
}