"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getTaxById } from "../../../data/taxes";
import { calculateTax } from "../../../utils/taxCalculators";
import CalculatorForm from "../../../components/CalculatorForm";
import ResultBox from "../../../components/ResultBox";
import { useState } from "react";

const colorMap = {
  '1': 'blue',
  '2': 'green',
  '3': 'purple',
  '4': 'orange',
  '5': 'blue',
  '6': 'green',
};

const iconMap = {
  '1': '🏢',
  '2': '👤',
  '3': '💰',
  '4': '📦',
  '5': '✂️',
  '6': '📊',
};

export default function TaxDetailPage({ params }) {
  const resolvedParams = use(params);
  const tax = getTaxById(resolvedParams.id);
  const [result, setResult] = useState(null);

  if (!tax) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '16px' }}>
          Tax Not Found
        </h1>
        <Link href="/" style={{ color: 'var(--primary)', fontWeight: '700' }}>
          ← Back to Calculators
        </Link>
      </div>
    );
  }

  const handleCalculate = (type, inputs) => {
    const calcResult = calculateTax(type, inputs);
    setResult(calcResult);
  };

  const color = colorMap[tax.id] || 'blue';
  const icon = iconMap[tax.id] || '📋';

  return (
    <div>
      {/* Breadcrumb & Back Link */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          color: 'var(--primary)',
          fontWeight: '700',
          textDecoration: 'none',
          fontSize: '13px',
          fontFamily: 'Poppins',
          gap: '6px'
        }}>
          ← Back to Calculators
        </Link>
      </div>

      {/* Header Section */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-start' }}>
          <div className={`ct-icon ${color}`} style={{ fontSize: '28px' }}>
            {icon}
          </div>
          <div>
            <div className={`badge badge-${color}`} style={{ marginBottom: '8px' }}>
              {tax.category}
            </div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              marginBottom: '4px'
            }}>
              {tax.nameEn}
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'var(--text-muted)',
              fontWeight: '600'
            }}>
              {tax.nameKm}
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border)'
        }}>
          <div>
            <div style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'Poppins',
              marginBottom: '6px'
            }}>
              Summary
            </div>
            <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--text-mid)' }}>
              {tax.summary}
            </p>
          </div>
          <div>
            <div style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'Poppins',
              marginBottom: '6px'
            }}>
              Who Pays
            </div>
            <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--text-mid)' }}>
              {tax.whoPays}
            </p>
          </div>
          <div>
            <div style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'Poppins',
              marginBottom: '6px'
            }}>
              Tax Base
            </div>
            <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--text-mid)' }}>
              {tax.taxBase}
            </p>
          </div>
        </div>
      </div>

      {/* Formula & Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div className="card">
          <div className="card-title">
            <div className="ct-icon blue">📐</div>
            <div>Formula</div>
          </div>
          <div style={{
            padding: '14px',
            background: '#f4f9ff',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: 'var(--primary)',
            lineHeight: '1.7',
            border: '1px solid var(--border)'
          }}>
            {tax.formula}
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            <div className="ct-icon green">💡</div>
            <div>Example</div>
          </div>
          <p style={{
            fontSize: '13px',
            lineHeight: '1.7',
            color: 'var(--text-mid)',
            fontStyle: 'italic'
          }}>
            {tax.example}
          </p>
        </div>
      </div>

      {/* Important Notes */}
      <div className="info-card blue" style={{ marginBottom: '32px' }}>
        <div className="ic-icon">⚠️</div>
        <div>
          <strong>Important:</strong> {tax.notes}
        </div>
      </div>

      {/* Calculator Form */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div className="card-title">
          <div className="ct-icon orange">🧮</div>
          <div>Calculator</div>
        </div>
        <CalculatorForm tax={tax} onCalculate={handleCalculate} />
      </div>

      {/* Results */}
      {result && (
        <div style={{ marginBottom: '32px' }}>
          <ResultBox result={result} />
        </div>
      )}
    </div>
  );
}
