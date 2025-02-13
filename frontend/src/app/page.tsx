'use client';
import ResultTable from '@/components/ResultTable';
import { Policy } from '@/types/policy';
import { useState, useEffect } from 'react';
;

export default function Home() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [searchName, setSearchName] = useState('');
  const [filters, setFilters] = useState({
    minPremium: '',
    maxPremium: '',
    type: '',
    minCoverage: '',
  });
  const [sortOrder, setSortOrder] = useState('');

  const fetchPolicies = async () => {
    const queryParams = new URLSearchParams();
    
    if (searchName) queryParams.append('name', searchName);
    if (filters.minPremium) queryParams.append('min_premium', filters.minPremium);
    if (filters.maxPremium) queryParams.append('max_premium', filters.maxPremium);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.minCoverage) queryParams.append('min_coverage', filters.minCoverage);
    if (sortOrder) queryParams.append('sort', sortOrder);

    try {
      const response = await fetch(`http://localhost:8000/api/policies/?${queryParams}`);
      const data = await response.json();
      setPolicies(data);
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [searchName, filters, sortOrder]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Insurance Policies</h1>
      
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Search policies..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="number"
            placeholder="Min Premium"
            value={filters.minPremium}
            onChange={(e) => setFilters({ ...filters, minPremium: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Max Premium"
            value={filters.maxPremium}
            onChange={(e) => setFilters({ ...filters, maxPremium: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">Select Type</option>
            <option value="TL">Term Life</option>
            <option value="HL">Health</option>
            <option value="VH">Vehicle</option>
          </select>
          <input
            type="number"
            placeholder="Min Coverage"
            value={filters.minCoverage}
            onChange={(e) => setFilters({ ...filters, minCoverage: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sort by Premium</option>
          <option value="premium_asc">Premium (Low to High)</option>
          <option value="premium_desc">Premium (High to Low)</option>
        </select>
      </div>

      <ResultTable policies={policies}/>
    </main>
  );
}