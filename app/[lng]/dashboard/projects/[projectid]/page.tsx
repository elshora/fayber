import { useTranslation } from "@/app/i18n";
import ProjectWrapper from "../components/ProjectWrapper";
import { Suspense } from "react";
import Loading from "../../components/loading";

type Params = {
  params: {
    projectid: string;
    lng: string;
  };
};

export default async function Index({ params: { projectid, lng } }: Params) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ProjectWrapper lng={lng} projectid={projectid} />
      </Suspense>
    </>
  );
}
