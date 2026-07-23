export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-black md:px-10 md:py-24">
      <h1 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">
        이용약관
      </h1>

      <div className="flex flex-col gap-8 text-sm leading-7 text-black/80">
        <section>
          <h2 className="mb-2 text-base font-bold">제1조 (목적)</h2>
          <p>
            이 약관은 (주)도호엔터테인먼트(이하 "회사")가 제공하는 웹사이트 및
            관련 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의
            권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">제2조 (정의)</h2>
          <p>
            "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 자를
            말하며, "콘텐츠"란 회사가 서비스를 통해 제공하는 영상, 이미지,
            텍스트 등 일체의 정보를 말합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">제3조 (약관의 효력 및 변경)</h2>
          <p>
            이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게
            공지함으로써 효력이 발생합니다. 회사는 관련 법령을 위배하지 않는
            범위에서 이 약관을 개정할 수 있으며, 개정된 약관은 적용일자 및
            개정사유를 명시하여 서비스 초기화면에 공지합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">제4조 (서비스의 제공 및 변경)</h2>
          <p>
            회사는 회사가 제작·기획하는 콘텐츠 및 프로젝트 소개, 채용 정보,
            문의 접수 등의 서비스를 제공합니다. 회사는 운영상, 기술상의 필요에
            따라 제공하는 서비스의 내용을 변경할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">제5조 (저작권의 귀속)</h2>
          <p>
            서비스 내에서 제공되는 콘텐츠에 대한 저작권 및 지적재산권은
            회사 또는 정당한 권리를 가진 제3자에게 귀속됩니다. 이용자는
            회사의 사전 서면 동의 없이 콘텐츠를 복제, 전송, 배포, 방송, 기타
            방법으로 이용하거나 제3자에게 이용하게 할 수 없습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">제6조 (이용자의 의무)</h2>
          <p>
            이용자는 관계 법령, 이 약관의 규정, 이용안내 및 서비스와 관련하여
            공지한 주의사항 등을 준수하여야 하며, 회사의 업무에 방해되는
            행위를 하여서는 안 됩니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">제7조 (면책조항)</h2>
          <p>
            회사는 천재지변, 불가항력적 사유로 서비스를 제공할 수 없는 경우
            책임이 면제됩니다. 회사는 이용자의 귀책사유로 인한 서비스 이용의
            장애에 대하여 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-bold">제8조 (분쟁의 해결)</h2>
          <p>
            이 약관과 관련하여 발생한 분쟁에 대해서는 대한민국 법을 준거법으로
            하며, 회사의 본점 소재지를 관할하는 법원을 전속 관할 법원으로
            합니다.
          </p>
        </section>

        <section>
          <p className="text-black/50">
            부칙: 이 약관은 2026년 1월 1일부터 시행합니다.
          </p>
        </section>
      </div>
    </main>
  );
}