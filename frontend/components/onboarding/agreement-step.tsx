"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Shield, AlertTriangle, Upload, File, X } from "lucide-react"
import { useState } from "react"

interface FormData {
  agreementAccepted: boolean
  agreementFile?: File
  agreementFileName?: string
}

interface AgreementStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function AgreementStep({ formData, updateFormData, nextStep, prevStep }: AgreementStepProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = (file: File) => {
    if (file.type === "application/pdf") {
      updateFormData({
        agreementFile: file,
        agreementFileName: file.name
      })
    } else {
      alert("Please upload a PDF file only.")
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const removeFile = () => {
    updateFormData({
      agreementFile: undefined,
      agreementFileName: undefined
    })
  }

  const handleSubmit = () => {
    if (formData.agreementAccepted && formData.agreementFile) {
      nextStep()
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">Legal Agreement</h2>
        <p className="text-muted-foreground">
          Upload your company's legal agreement or terms for selling waste materials
        </p>
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <Label htmlFor="agreement-file" className="text-base font-medium">
          Upload Legal Agreement (PDF only)
        </Label>
        <p className="mb-4 text-sm text-muted-foreground">
          Upload your company's legal terms, conditions, or agreement template that buyers must agree to when purchasing your materials.
        </p>
        
        {!formData.agreementFile ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {dragActive ? "Drop your PDF here" : "Upload your legal agreement"}
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop your PDF file here, or click to browse
              </p>
            </div>
            <Input
              id="agreement-file"
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <File className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{formData.agreementFileName}</p>
                  <p className="text-sm text-muted-foreground">PDF Document</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={removeFile}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Standard Terms Section */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Standard Platform Terms</h3>
        <ScrollArea className="h-48 w-full rounded-md border p-4">
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-2">
              <Shield className="mt-1 h-4 w-4 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">Platform Usage</h4>
                <p className="text-muted-foreground">
                  By using WasteFlow, you agree to our platform terms including data sharing for matching purposes and transaction facilitation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-1 h-4 w-4 text-amber-500" />
              <div>
                <h4 className="font-semibold text-foreground">Liability</h4>
                <p className="text-muted-foreground">
                  WasteFlow facilitates connections but is not liable for transactions between parties. All material quality and safety responsibilities remain with the seller.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="mt-1 h-4 w-4 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">Data Protection</h4>
                <p className="text-muted-foreground">
                  Your company information will be shared with potential buyers for matching purposes. We maintain strict confidentiality standards.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="mb-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreement"
            checked={formData.agreementAccepted}
            onCheckedChange={(checked) => updateFormData({ agreementAccepted: checked as boolean })}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="agreement"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have uploaded my company's legal agreement and agree to the platform terms
            </label>
            <p className="text-xs text-muted-foreground">
              By checking this box, you confirm that you have uploaded your legal agreement and accept the platform terms.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!formData.agreementAccepted || !formData.agreementFile}
        >
          Continue
        </Button>
      </div>
    </Card>
  )
}
