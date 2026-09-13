'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Download, Filter, FileText, CheckCircle2, BatteryCharging, Zap, ShieldCheck } from 'lucide-react';

interface CatalogueItem {
  sku: string;
  category: 'BMS' | 'Power' | 'Vision';
  subCategory: string;
  chemistry: string;
  voltage: string;
  current: string;
  balancing: string;
  application: string;
  datasheetUrl: string;
}

const CATALOGUE_DATA: CatalogueItem[] = [
  // BMS Lineup
  { sku: 'AX-PCM-4S20A', category: 'BMS', subCategory: 'Protection Series', chemistry: 'LiFePO4 / NMC', voltage: '12.8V (4S)', current: '20A', balancing: 'Passive 50mA', application: 'Solar Lanterns / Small Storage', datasheetUrl: '#' },
  { sku: 'AX-PCM-8S40A', category: 'BMS', subCategory: 'Protection Series', chemistry: 'LiFePO4', voltage: '25.6V (8S)', current: '40A', balancing: 'Passive 60mA', application: 'Solar Streetlights / E-Bikes', datasheetUrl: '#' },
  { sku: 'AX-PCM-16S60A', category: 'BMS', subCategory: 'Protection Series', chemistry: 'LiFePO4', voltage: '51.2V (16S)', current: '60A', balancing: 'Passive 80mA', application: 'Telecom Backup / EV 2W', datasheetUrl: '#' },
  { sku: 'AX-PCM-24S100A', category: 'BMS', subCategory: 'Protection Series', chemistry: 'LiFePO4 / NMC', voltage: '76.8V (24S)', current: '100A', balancing: 'Passive 100mA', application: 'EV 3-Wheeler Auto', datasheetUrl: '#' },

  { sku: 'AX-BMS6000-6S', category: 'BMS', subCategory: 'Smart Series (BMS6000)', chemistry: 'LiFePO4', voltage: '19.2V (6S)', current: '60A / 120A Peak', balancing: '1.2A Active', application: 'Robotics / Drones / SaaS', datasheetUrl: '#' },
  { sku: 'AX-BMS6000-8S', category: 'BMS', subCategory: 'Smart Series (BMS6000)', chemistry: 'LiFePO4', voltage: '25.6V (8S)', current: '100A / 200A Peak', balancing: '1.2A Active', application: 'Light EV / Solar Storage', datasheetUrl: '#' },
  { sku: 'AX-BMS6000-16S', category: 'BMS', subCategory: 'Smart Series (BMS6000)', chemistry: 'LiFePO4', voltage: '51.2V (16S)', current: '150A / 300A Peak', balancing: '2.0A Active', application: 'EV Auto / Commercial ESS', datasheetUrl: '#' },
  { sku: 'AX-BMS6000-24S', category: 'BMS', subCategory: 'Smart Series (BMS6000)', chemistry: 'LiFePO4 / NMC / LTO', voltage: '76.8V (24S)', current: '200A / 400A Peak', balancing: '2.0A Active', application: 'Commercial EV 4W / Grid', datasheetUrl: '#' },

  { sku: 'AX-HV-BMU-MASTER', category: 'BMS', subCategory: 'High-Voltage Stack', chemistry: 'Universal LiFePO4', voltage: '100V - 1000V DC', current: '300A Cont', balancing: 'Master BCU', application: 'MW Container ESS / EV Bus', datasheetUrl: '#' },
  { sku: 'AX-HV-SLAVE-16S', category: 'BMS', subCategory: 'High-Voltage Stack', chemistry: 'LiFePO4', voltage: '51.2V (16S Stack)', current: '300A Cont', balancing: '2.5A Active Transformer', application: 'HV Stack Slave Unit', datasheetUrl: '#' },

  // Power Electronics
  { sku: 'AX-PSU-12V10A', category: 'Power', subCategory: 'Industrial SMPS', chemistry: 'N/A', voltage: '12V DC Output', current: '10A', balancing: 'PFC Active', application: 'DIN Rail Control Panels', datasheetUrl: '#' },
  { sku: 'AX-PSU-[#24V20A]', category: 'Power', subCategory: 'Industrial SMPS', chemistry: 'N/A', voltage: '24V DC Output', current: '20A', balancing: 'PFC Active', application: 'Factory Automation Lines', datasheetUrl: '#' },
  { sku: 'AX-INV-3KW-48V', category: 'Power', subCategory: 'Hybrid Inverters', chemistry: 'LiFePO4 Sync', voltage: '48V DC / 230V AC', current: '60A Inverter', balancing: 'Pure Sine Wave', application: 'Residential Solar Backup', datasheetUrl: '#' },
  { sku: 'AX-UPS-ONLINE-10KVA', category: 'Power', subCategory: 'Industrial UPS', chemistry: 'LiFePO4 Sync', voltage: '192V DC / 230V AC', current: '10 kVA', balancing: '0ms Online Double', application: 'Data Centers / Hospitals', datasheetUrl: '#' },

  // AI Vision
  { sku: 'AX-VIS-FACE-7IN', category: 'Vision', subCategory: 'Biometric Access', chemistry: 'N/A', voltage: '12V DC POE+', current: '2A', balancing: '< 0.18s Match', application: 'Biometric Attendance Gate', datasheetUrl: '#' },
  { sku: 'AX-VIS-ANPR-4MP-HIGH', category: 'Vision', subCategory: 'ANPR Camera', chemistry: 'N/A', voltage: '12V DC / POE+', current: '1.5A', balancing: '160 km/h OCR', application: 'Toll Barriers / Traffic', datasheetUrl: '#' },
];

export default function CataloguePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedChemistry, setSelectedChemistry] = useState<string>('ALL');

  const filteredItems = useMemo(() => {
    return CATALOGUE_DATA.filter((item) => {
      const matchesSearch = 
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(search.toLowerCase()) ||
        item.application.toLowerCase().includes(search.toLowerCase());

      const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesChem = selectedChemistry === 'ALL' || item.chemistry.includes(selectedChemistry);

      return matchesSearch && matchesCat && matchesChem;
    });
  }, [search, selectedCategory, selectedChemistry]);

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>AXQUBIT MASTER MODEL CATALOGUE & SPECIFICATIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Filterable Product Catalogue & Datasheets
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Filter through AXQUBIT’s full SKU catalog by product line, battery chemistry, operating voltage, balancing technology, and application domain.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0f141c] border border-gray-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by SKU, app, or spec..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <span className="text-gray-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {['ALL', 'BMS', 'Power', 'Vision'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-cyan-400 text-black' 
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Chemistry Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Chemistry:</span>
            <select
              value={selectedChemistry}
              onChange={(e) => setSelectedChemistry(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">All Chemistries</option>
              <option value="LiFePO4">LiFePO4</option>
              <option value="NMC">NMC</option>
              <option value="LTO">LTO</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto bg-[#0f141c] border border-gray-800 rounded-2xl shadow-xl font-mono text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900/90 text-gray-400 border-b border-gray-800">
              <th className="p-4">SKU Model</th>
              <th className="p-4">Category / Line</th>
              <th className="p-4">Chemistry</th>
              <th className="p-4">Operating Voltage</th>
              <th className="p-4">Rating / Current</th>
              <th className="p-4">Balancing / Feature</th>
              <th className="p-4">Target Application</th>
              <th className="p-4">Datasheet</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-200">
            {filteredItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-800/40 transition-colors">
                <td className="p-4 font-bold text-cyan-400">{item.sku}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300">
                    {item.subCategory}
                  </span>
                </td>
                <td className="p-4 text-emerald-400 font-bold">{item.chemistry}</td>
                <td className="p-4 text-white">{item.voltage}</td>
                <td className="p-4 text-amber-400 font-bold">{item.current}</td>
                <td className="p-4 text-gray-300">{item.balancing}</td>
                <td className="p-4 text-gray-400">{item.application}</td>
                <td className="p-4">
                  <Link
                    href="/resources/documents"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </Link>
                </td>
              </tr>
            ))}

            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-400">
                  No matching models found for your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
