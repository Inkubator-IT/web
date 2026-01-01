"use client";

import ExportedImage from "next-image-export-optimizer";
import { Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_auto_auto] md:gap-[150px]">
          <div className="flex items-start justify-start">
            <ExportedImage
              src="/logo-iit.svg"
              alt="InkubatorIT"
              width={120}
              height={40}
              className="h-[78px] w-auto! md:h-[60px]"
            />
          </div>

          <div className="flex flex-col items-start justify-between">
            <div className="flex w-full items-center justify-between gap-4 mb-12 md:mb-0">
              <h3 className="text-xl">
                Himpunan Mahasiswa Informatika
                <br />
                Institut Teknologi Bandung
              </h3>
              <div className="flex items-center justify-center h-full">
                <ExportedImage
                  src="/logo-hmif.png"
                  alt="HMIF ITB"
                  width={72}
                  height={47}
                  className="inline-block"
                />
              </div>
            </div>
            <p className="leading-relaxed text-white/80 text-base">
              Sekretariat HMIF Gedung Benny Subianto (Labtek V), Institut
              Teknologi Bandung, Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan
              Coblong, Kota Bandung, Jawa Barat 40132
            </p>
          </div>

          <div className="flex flex-col items-start justify-start">
            <h3 className="mb-4 text-2xl font-semibold md:mb-6 md:text-2xl">
              <span className="bg-linear-to-r from-[#AD99E7] to-[#FFBC6C] bg-clip-text text-transparent">
                Our Contact
              </span>
            </h3>

            <div className="flex flex-col gap-4 md:gap-3">
              <a
                href="mailto:inkubatorit.hmif.itb@gmail.com"
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="text-xl">
                  inkubatorit.hmif.itb@gmail.com
                </span>
              </a>

              <a
                href="https://wa.me/+6285121047144"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
              >
                <ExportedImage
                  src="/whatsapp.svg"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="text-xl">(+62) 85121047144</span>
              </a>

              <a
                href="https://instagram.com/inkubatorit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="text-xl">@inkubatorit</span>
              </a>

              <a
                href="https://linkedin.com/company/inkubatorit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
              >
                <ExportedImage
                  src="/linkedin.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="text-xl">Inkubator IT</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
