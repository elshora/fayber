import { getContractorById } from "../actions/actions";import ContractorForm from "../components/ContractorForm";
export default async function Page({
  params: { lng, contrId },
}: {
  params: { lng: string; contrId: string };
}) {
  const contartctor = await getContractorById(contrId);
  return (
    <div>
      <ContractorForm lng={lng} />
    </div>
  );
}
