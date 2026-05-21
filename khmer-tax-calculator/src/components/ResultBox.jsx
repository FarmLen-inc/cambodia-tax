"use client";

export default function ResultBox({ result }) {
  if (!result) return null;

  const formatCurrency = (val) => {
    if (typeof val !== 'number') return val;
    return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const getResultColor = (resultType) => {
    const colorMap = {
      classification: 'blue',
      bracket: 'blue',
      originalPrice: 'purple',
      sellingPrice: 'orange',
      paymentAmount: 'purple',
      minimumTax: 'green',
    };
    return colorMap[resultType] || 'blue';
  };

  // Detect result type
  let resultType = 'standard';
  let headerColor = 'blue';
  
  if (result.classification) {
    resultType = 'classification';
    headerColor = 'blue';
  } else if (result.bracket !== undefined && result.grossSalary !== undefined) {
    resultType = 'salary';
    headerColor = 'green';
  } else if (result.originalPrice !== undefined && result.vatAmount !== undefined) {
    resultType = 'vat';
    headerColor = 'purple';
  } else if (result.sellingPrice !== undefined && result.taxBase !== undefined) {
    resultType = 'excise';
    headerColor = 'orange';
  } else if (result.paymentAmount !== undefined && result.whtRate !== undefined) {
    resultType = 'withholding';
    headerColor = 'blue';
  } else if (result.minimumTax !== undefined) {
    resultType = 'minimum';
    headerColor = 'green';
  }

  return (
    <div className="result-panel show">
      <div className={`result-header ${headerColor}`}>
        <span>✓</span>
        <span>Calculation Result</span>
      </div>
      <div className="result-body">
        <div className="stats-grid" style={{ marginBottom: '24px' }}>
          {/* Business Classification Result */}
          {result.classification && (
            <>
              <div className="stat-card blue">
                <div className="sc-label">Classification</div>
                <div className="sc-value">{result.icon} {result.classification}</div>
              </div>
              <div className="stat-card blue">
                <div className="sc-label">Details</div>
                <div className="sc-value" style={{ fontSize: '12px' }}>{result.details}</div>
              </div>
            </>
          )}

          {/* Salary Tax Result */}
          {result.bracket !== undefined && result.grossSalary !== undefined && (
            <>
              <div className="stat-card blue">
                <div className="sc-label">Gross Salary</div>
                <div className="sc-value">{formatCurrency(result.grossSalary)} KHR</div>
              </div>
              <div className="stat-card blue">
                <div className="sc-label">Tax Bracket</div>
                <div className="sc-value">{result.bracket}%</div>
              </div>
              <div className="stat-card green">
                <div className="sc-label">Tax Amount</div>
                <div className="sc-value">{formatCurrency(result.taxAmount)} KHR</div>
              </div>
              <div className="stat-card green">
                <div className="sc-label">Net Salary</div>
                <div className="sc-value">{formatCurrency(result.netSalary)} KHR</div>
              </div>
            </>
          )}

          {/* VAT Result */}
          {result.originalPrice !== undefined && result.vatAmount !== undefined && (
            <>
              <div className="stat-card purple">
                <div className="sc-label">Price Type</div>
                <div className="sc-value" style={{ fontSize: '12px' }}>
                  {result.priceType === 'included' ? 'Inclusive' : 'Exclusive'}
                </div>
              </div>
              <div className="stat-card purple">
                <div className="sc-label">Original Price</div>
                <div className="sc-value">{formatCurrency(result.originalPrice)} KHR</div>
              </div>
              <div className="stat-card purple">
                <div className="sc-label">VAT (10%)</div>
                <div className="sc-value">{formatCurrency(result.vatAmount)} KHR</div>
              </div>
              <div className="stat-card purple">
                <div className="sc-label">Final Price</div>
                <div className="sc-value">{formatCurrency(result.finalPrice)} KHR</div>
              </div>
            </>
          )}

          {/* Excise Tax Result */}
          {result.sellingPrice !== undefined && result.taxBase !== undefined && (
            <>
              <div className="stat-card orange">
                <div className="sc-label">Selling Price</div>
                <div className="sc-value">{formatCurrency(result.sellingPrice)} KHR</div>
              </div>
              <div className="stat-card orange">
                <div className="sc-label">Tax Base (90%)</div>
                <div className="sc-value">{formatCurrency(result.taxBase)} KHR</div>
              </div>
              <div className="stat-card orange">
                <div className="sc-label">Excise Tax</div>
                <div className="sc-value">{formatCurrency(result.exciseTax)} KHR</div>
              </div>
              <div className="stat-card orange">
                <div className="sc-label">Final Price</div>
                <div className="sc-value">{formatCurrency(result.finalPrice)} KHR</div>
              </div>
            </>
          )}

          {/* Withholding Tax Result */}
          {result.paymentAmount !== undefined && result.whtRate !== undefined && (
            <>
              <div className="stat-card blue">
                <div className="sc-label">Income Type</div>
                <div className="sc-value" style={{ fontSize: '12px' }}>{result.incomeLabel}</div>
              </div>
              <div className="stat-card blue">
                <div className="sc-label">Residency</div>
                <div className="sc-value" style={{ fontSize: '12px' }}>
                  {result.residency === 'resident' ? 'Resident' : 'Non-Resident'}
                </div>
              </div>
              <div className="stat-card blue">
                <div className="sc-label">Payment Amount</div>
                <div className="sc-value">{formatCurrency(result.paymentAmount)} KHR</div>
              </div>
              <div className="stat-card green">
                <div className="sc-label">Withholding Tax</div>
                <div className="sc-value">{formatCurrency(result.withholdingTax)} KHR</div>
              </div>
              <div className="stat-card green">
                <div className="sc-label">Net Amount</div>
                <div className="sc-value">{formatCurrency(result.netAmount)} KHR</div>
              </div>
            </>
          )}

          {/* Minimum Tax Result */}
          {result.minimumTax !== undefined && (
            <>
              <div className="stat-card green">
                <div className="sc-label">Annual Turnover</div>
                <div className="sc-value">{formatCurrency(result.turnover)} KHR</div>
              </div>
              <div className="stat-card green">
                <div className="sc-label">Minimum Tax (1%)</div>
                <div className="sc-value">{formatCurrency(result.minimumTax)} KHR</div>
              </div>
              {result.toi > 0 && (
                <>
                  <div className="stat-card green">
                    <div className="sc-label">Tax on Income</div>
                    <div className="sc-value">{formatCurrency(result.toi)} KHR</div>
                  </div>
                  <div className="stat-card green">
                    <div className="sc-label">Tax Payable (max)</div>
                    <div className="sc-value">{formatCurrency(result.taxPayable)} KHR</div>
                  </div>
                </>
              )}
              {result.toi === 0 && (
                <div className="stat-card green">
                  <div className="sc-label">Tax Payable</div>
                  <div className="sc-value">{formatCurrency(result.taxPayable)} KHR</div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Result Details */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '20px',
          marginTop: '20px'
        }}>
          <div className="result-row">
            <span className="r-label">Formula Used:</span>
          </div>
          <div style={{
            padding: '12px',
            background: '#f4f9ff',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: 'var(--primary)',
            marginBottom: '20px',
            border: '1px solid var(--border)'
          }}>
            {result.formulaUsed}
          </div>

          <div style={{
            fontSize: '13px',
            fontWeight: '700',
            color: 'var(--text-mid)',
            marginBottom: '12px'
          }}>
            Step-by-Step Breakdown:
          </div>
          <ul style={{
            listStyle: 'none',
            paddingLeft: 0
          }}>
            {result.steps.map((step, idx) => (
              <li
                key={idx}
                style={{
                  padding: '8px 0',
                  color: 'var(--text-mid)',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  display: 'flex',
                  gap: '8px'
                }}
              >
                <span style={{ color: 'var(--primary)', fontWeight: '700' }}>•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="info-card blue" style={{ marginTop: '20px', marginBottom: 0 }}>
          <div className="ic-icon">ℹ️</div>
          <div>
            <strong>Disclaimer:</strong> This calculator is for informational and educational purposes only. Tax rates may be unverified. Always consult with a qualified tax professional.
          </div>
        </div>
      </div>
    </div>
  );
}
