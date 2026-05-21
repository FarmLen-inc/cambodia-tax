import Link from "next/link";
import { taxes } from "../data/taxes";

export default function Home() {
  const getIcon = (id: string) => {
    const icons: { [key: string]: string } = {
      '1': '🏢',
      '2': '👤',
      '3': '💰',
      '4': '📦',
      '5': '✂️',
      '6': '📊',
    };
    return icons[id] || '📋';
  };

  const getColor = (index: number) => {
    const colors = ['blue', 'green', 'purple', 'orange', 'blue', 'green'];
    return colors[index % colors.length];
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="breadcrumb">Home / Calculators</div>
        <h1>Cambodian Tax Calculators</h1>
        <p>Select a tax type to calculate and understand your tax obligations</p>
      </div>

      {/* Info Card */}
      <div className="info-card blue">
        <div className="ic-icon">ℹ️</div>
        <div>
          <strong>Educational Tool:</strong> This calculator provides estimates for Cambodian taxes based on current guidelines. For official calculations, please consult with a qualified tax professional.
        </div>
      </div>

      {/* Tax Calculators Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {taxes.map((tax, index) => {
          const color = getColor(index);
          return (
            <Link key={tax.id} href={`/taxes/${tax.id}`}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <div className="card-title">
                  <div className={`ct-icon ${color}`}>{getIcon(tax.id)}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontFamily: 'Poppins' }}>
                      {tax.nameEn}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      {tax.nameKm}
                    </div>
                  </div>
                </div>

                <div style={{
                  fontSize: '13.5px',
                  lineHeight: '1.6',
                  color: 'var(--text-mid)',
                  marginBottom: '16px',
                  flex: 1
                }}>
                  {tax.summary}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border)'
                }}>
                  <span className={`badge badge-${color}`}>
                    {tax.category}
                  </span>
                  <span style={{
                    color: 'var(--primary)',
                    fontWeight: '700',
                    fontSize: '13px',
                    fontFamily: 'Poppins'
                  }}>
                    Open →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Reference */}
      <div className="card">
        <div className="card-title">
          <div className="ct-icon blue">📚</div>
          <div>Quick Reference</div>
        </div>

        <table className="tax-table">
          <thead>
            <tr>
              <th>Tax Type</th>
              <th>Tax Basis</th>
              <th>Key Feature</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Business Classification</strong></td>
              <td>Annual Income</td>
              <td>7 classification tiers</td>
            </tr>
            <tr>
              <td><strong>Salary Tax</strong></td>
              <td>Monthly Salary</td>
              <td>Progressive 0-20% brackets</td>
            </tr>
            <tr>
              <td><strong>VAT</strong></td>
              <td>Sales/Purchase</td>
              <td>10% standard rate</td>
            </tr>
            <tr>
              <td><strong>Excise Tax</strong></td>
              <td>Goods Base Price</td>
              <td>Item-specific rates</td>
            </tr>
            <tr>
              <td><strong>Withholding Tax</strong></td>
              <td>Rental/Income</td>
              <td>Resident/Non-resident rates</td>
            </tr>
            <tr className="active-row">
              <td><strong>Minimum Tax</strong></td>
              <td>Annual Turnover</td>
              <td>1% of annual turnover</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
