import { ExportButton } from "../report/export-button";

interface Props {
  query: {
    from: string;
    to: string;
    rows: number;
  };
}

export const MembersSpendingExport = ({ query }: Props) => {
  const { from, to, rows } = query;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = new URLSearchParams();
  params.set("from", from);
  params.set("to", to);
  params.set("rows", rows.toString());

  const href = `${baseUrl}/report/member/spending?${params.toString()}`;

  return <ExportButton href={href} label="Export" />;
};
