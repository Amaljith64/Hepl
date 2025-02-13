import { Policy } from '@/types/policy'
import React from 'react'

type Props = {
    policies:Policy[]
}

function ResultTable({policies}: Props) {
  return (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Premium</th>
              <th className="p-2 border">Coverage</th>
            </tr>
          </thead>
          <tbody>
            {policies.length > 0 ? (
              policies.map((policy) => (
                <tr key={policy.id}>
                  <td className="p-2 border">{policy.name}</td>
                  <td className="p-2 border">{policy.type}</td>
                  <td className="p-2 border">${policy.premium}</td>
                  <td className="p-2 border">${policy.coverage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  No policies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  )
}

export default ResultTable