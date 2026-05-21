'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const calculators = [
    { id: '1', name: 'ពន្ធលើការលក់', nameEn: 'Business Classification', icon: '🏢' },
    { id: '2', name: 'ពន្ធលើប្រាក់ខែ', nameEn: 'Salary Tax', icon: '👤' },
    { id: '3', name: 'ពន្ធលើតម្លៃ', nameEn: 'VAT', icon: '💰' },
    { id: '4', name: 'ពន្ធលើច្បាប់ចម្លង', nameEn: 'Excise Tax', icon: '📦' },
    { id: '5', name: 'ពន្ធកាត់ទុក', nameEn: 'Withholding', icon: '✂️' },
    { id: '6', name: 'ពន្ធអប្បបរមា', nameEn: 'Minimum Tax', icon: '📊' },
  ];

  const isActive = (id) => pathname === `/taxes/${id}`;

  const handleCloseSidebar = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Menu */}
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? 'show' : ''}`}
        onClick={handleCloseSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">💳</div>
          <h2>Cambodia Tax</h2>
          <p>Calculator</p>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-label">ឧបករណ៍គណនា</div>
          {calculators.map((calc) => (
            <Link
              key={calc.id}
              href={`/taxes/${calc.id}`}
              className={`nav-item ${isActive(calc.id) ? 'active' : ''}`}
              onClick={handleCloseSidebar}
            >
              <div className="nav-icon">{calc.icon}</div>
              <div>
                <div style={{ fontSize: '12.5px', fontFamily: 'Poppins' }}>
                  {calc.nameEn}
                </div>
                <div>{calc.name}</div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="currency-btn">💵 USD / KHR</button>
          <p style={{ marginTop: '12px', textAlign: 'center' }}>
            Version 1.0
          </p>
        </div>
      </div>
    </>
  );
}
