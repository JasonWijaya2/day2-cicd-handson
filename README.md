# day2-cicd-handson

![CI](https://github.com/JasonWijaya2/day2-cicd-handson/actions/workflows/ci.yml/badge.svg)

Project latihan **build automation & CI pipeline**.

## Perintah lokal
| Perintah        | Fungsi                             |
|-----------------|------------------------------------|
| `npm install`   | pasang dependency                  |
| `npm run lint`  | cek kualitas kode                  |
| `npm run build` | build + validasi (`dist/`)         |
| `npm start`     | jalankan contoh app                |

## Pipeline
- `.github/workflows/ci.yml` — pipeline utama (lint → build → package)
- `.github/workflows/nightly.yml` — nightly build (memanggil reusable workflow)
- `.github/workflows/reusable-node.yml` — reusable workflow
- `.gitlab-ci.yml` — versi GitLab (perbandingan)

Alur: **Checkout → Install → Lint → Build → (Package di main)**.

## Branch Protection (konsep)
Di Settings → Branches, aktifkan "Require status checks to pass before merging",
pilih job `Lint` & `Build`. Efeknya: PR tidak bisa di-merge kalau CI merah.
Inilah **build validation gate** yang sesungguhnya.