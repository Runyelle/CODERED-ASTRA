"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TestAPIPage() {
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult("Testing connection...")
    
    try {
      // Test basic connection
      const response = await fetch("http://localhost:8001/")
      const data = await response.json()
      setResult(`✅ Backend connected: ${JSON.stringify(data)}`)
      
      // Test companies endpoint
      const companiesResponse = await fetch("http://localhost:8001/companies/")
      const companies = await companiesResponse.json()
      setResult(prev => prev + `\n✅ Companies loaded: ${companies.length} companies`)
      
      // Test load sample data
      const loadResponse = await fetch("http://localhost:8001/load-sample-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      })
      const loadData = await loadResponse.json()
      setResult(prev => prev + `\n✅ Sample data: ${JSON.stringify(loadData)}`)
      
    } catch (error) {
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
        <Button onClick={testConnection} disabled={loading}>
          {loading ? "Testing..." : "Test Backend Connection"}
        </Button>
        {result && (
          <pre className="mt-4 p-4 bg-muted rounded-lg whitespace-pre-wrap">
            {result}
          </pre>
        )}
      </Card>
    </div>
  )
}
