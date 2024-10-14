import React, { Suspense } from "react";
import Loading from "../components/loading";
import ProjectsWrapper from "./components/ProjectsWrapper";
export default async function Index({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  return (
    <div className="space-y-5 w-full px-3">
      <Suspense fallback={<Loading />}>
        <ProjectsWrapper lng={lng} />
      </Suspense>
    </div>
  );
}
