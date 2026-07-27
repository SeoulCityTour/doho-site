"use client";

type InfoField = {
  label: string;
  value: string;
};

type Project = {
  id: string;
  statusEn: string;
  statusKo: string;
  titleKo: string;
  titleEn: string;
  fields: InfoField[];
  images: string[];
};

const project: Project = {
  id: "uncle",
  statusEn: "In Post Production",
  statusKo: "후반작업 중",
  titleKo: "엉클",
  titleEn: "Uncle",
  fields: [
    { label: "감독", value: "김형협" },
    { label: "출연", value: "고수, 김해숙" },
  ],
  images: ["/un.png", "/un2.png"],
};

export default function ProjectPage() {
  return (
    <main className="w-full">
      {/* 상단 배너 */}
      <section className="relative flex h-[220px] w-full flex-col justify-end overflow-hidden bg-[#141210] px-6 pb-8 text-white md:h-[280px] md:px-10 md:pb-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 30% 20%, #3a332c 0%, #201c18 45%, #0f0d0b 100%)",
          }}
        />

        <div className="relative z-10">
          <p className="flex flex-wrap items-baseline gap-2 text-xl tracking-tight sm:text-2xl md:text-3xl">
            <span style={{ fontFamily: "'AritaSansLTN', sans-serif", fontWeight: 500 }}>
              {project.statusEn}
            </span>
            <span style={{ fontFamily: "'AritaDotumKR', sans-serif", fontWeight: 500 }}>
              {project.statusKo}
            </span>
          </p>
        </div>
      </section>

      {/* 상세 정보 */}
      <section
        className="relative w-full overflow-hidden bg-white px-6 py-10 text-black md:px-10 md:py-14"
        style={{ fontFamily: "'AritaBuriKR', sans-serif", fontWeight: 500 }}
      >
        <div>
          {/* 타이틀 - 위쪽 */}
          <h1 className="mb-10 text-2xl tracking-tight sm:text-3xl">
            <span style={{ fontFamily: "'AritaDotumKR', sans-serif", fontWeight: 500 }}>
              {project.titleKo}
            </span>{" "}
            <span style={{ fontFamily: "'AritaSansLTN', sans-serif", fontWeight: 500 }}>
              {project.titleEn}
            </span>
          </h1>

          {/* 상세 필드 - 감독/출연 값은 제목보다 얇고 작게 */}
          <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:gap-20">
            {project.fields.map((field) => (
              <div key={field.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                  {field.label}
                </p>
                <p
                  className="mt-2 text-lg tracking-tight text-black/80 sm:text-xl"
                  style={{ fontFamily: "'AritaBuriKR', sans-serif", fontWeight: 400 }}
                >
                  {field.value}
                </p>
              </div>
            ))}
          </div>

          {/* 이미지 - 나란히 */}
          {project.images.length > 0 && (
            <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6">
              {project.images.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.titleKo} ${project.titleEn}`}
                  className="w-full object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}