"use client"

import Image from "next/image"

export function SponsorBar() {
  const sponsors = [
    { name: "ConocoPhillips", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/ConocoPhillips_Logo.svg/1280px-ConocoPhillips_Logo.svg.png" },
    { name: "Google Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/2560px-Google_Gemini_logo.svg.png" },
    { name: "Red Bull", logo: "https://www.svgrepo.com/show/303227/redbull-logo.svg" },
    { name: "MLH", logo: "https://static.mlh.io/brand-assets/logo/official/mlh-logo-color.png" },
    { name: "Tokio Marine HCC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Tokio-marine-hcc-logo.svg/1200px-Tokio-marine-hcc-logo.svg.png" },
    { name: "Pure Buttons", logo: "https://www.palebird.com/wp-content/uploads/2018/01/purebuttons-logo-blue.png" },
    { name: "RSM", logo: "https://www.goodsports.org/assets/RSM-Standard-Logo-RGB.png" },
    { name: "Cougar CS", logo: "https://yt3.googleusercontent.com/WfIFDHxXML0xU3lo-Rb4HuyulB-TswJn6f5Rothex9xaA5Ed5f14fkDj9B9Fo9jCyIQVb7M1Vg=s900-c-k-c0x00ffffff-no-rj" }
  ]

  return (
    <section className="relative border-t border-border/40 bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <p className="mb-10 text-sm font-medium uppercase tracking-wider text-gray-600">Proudly Supported By</p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="group flex items-center justify-center rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-gray-300"
              >
                <div className="relative h-20 w-full">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain grayscale transition-all group-hover:grayscale-0"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
