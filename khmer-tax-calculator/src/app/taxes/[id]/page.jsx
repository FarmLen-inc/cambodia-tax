import { taxes, getTaxById } from "../../../data/taxes";
import TaxDetailClient from "./TaxDetailClient";

export async function generateStaticParams() {
  return taxes.map((t) => ({ id: t.id }));
}

export default async function TaxDetailPage({ params }) {
  const { id } = await params;
  const tax = getTaxById(id);
  return <TaxDetailClient tax={tax} />;
}
