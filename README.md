Bu repo KTU NextGen kulübü için geliştirilmiştir :)

# NextGen KTÜ web sitesi

Framer'daki **Uplink 27** template'inin "Full Site Export" çıktısı (`uplink-copy-site/`)
temel alınarak NextGen KTÜ'ye dönüştürülmüş statik site.

## Çalıştırma

Build adımı yok — export, sunucu tarafında render edilmiş HTML + Framer'ın React
runtime modüllerinden oluşuyor.

```bash
node tools/serve.mjs
```

→ http://localhost:4173 (önbelleksiz yerel sunucu). Site **alan adının köküne**
yayınlanmalı; runtime varlıkları `/assets/…` olarak çözüyor.

## Yapı

| Yol | İçerik |
| --- | --- |
| `uplink-copy-site/index.html` | Ana sayfa (SSR HTML + hydration verisi) |
| `uplink-copy-site/assets/framerusercontent.com/sites/<id>/Gm22-….mjs` | Ana sayfa bileşeni (metinler burada da var) |
| `…/toplevel-deps….mjs` | Header, menü, footer |
| `…/augiA20Il….mjs` | Ana sayfa başlık/açıklama metadata'sı |
| `uplink-copy-site/assets/nextgen/nextgen.css` | NextGen override'ları: bölüm sırası, gizlenen template parçaları |
| `uplink-copy-site/assets/nextgen/placeholders/` | Gerçek görseller gelene kadar kullanılan nötr SVG'ler |
| `tools/` | Dönüşüm araçları (aşağıda) |

### Neden metinler birden fazla yerde?

Framer export'unda her görünür metin 3 kopyada yaşar: SSR HTML, hydration JSON'u
(CMS satırları, `index.html` içinde) ve derlenmiş JS modülleri. Sayfa yüklenince
React modüllerden yeniden çizer; yalnızca HTML'i değiştirirsen eski metin geri
gelir. Bu yüzden metin değişikliği için:

```bash
node tools/replace-text.mjs "eski metin" "yeni metin"
```

Bu komut tüm kopyaları birlikte günceller (`--dry` ile önce kontrol edebilirsin).
Yeni metinde backtick (`) ve `${` kullanma; kesme işareti için ’ kullan.

### Araçlar

- `tools/apply-palette.mjs` — Framer renk token'larını NextGen paletine çevirir (light theme).
- `tools/replace-text.mjs` — metni tüm kopyalarda değiştirir.
- `tools/make-placeholders.mjs` — placeholder SVG'leri üretir.
- `tools/migrations/001-nextgen-home.mjs` — Uplink → NextGen ana sayfa dönüşümünün kaydı
  (hangi metin neye dönüştü, link hedefleri, görsel eşlemeleri).
- `tools/serve.mjs` — yerel önizleme sunucusu.

## Ana sayfa bölümleri

| Sıra | NextGen bölümü | Template'deki karşılığı | Anchor |
| --- | --- | --- | --- |
| 1 | Hero (`nextgen ktü`) | Hero | — |
| 2 | yaklaşım/ — topluluk ilkeleri | Last year (alıntı karuseli + istatistikler) | — |
| 3 | faaliyetler/ — öğren / üret / paylaş | Tickets | `#tickets` |
| 4 | etkinlikler/ — etkinlik türleri | Lineup | `#lineup` |
| 5 | projeler/ — üye projeleri | Sponsors | `#sponsors` |
| 6 | kampüs/ — harita + galeri | Venue | `#venue` |
| 7 | katıl/ — üye ol / konuşmacı ol / atölye öner | Call for papers | `#cfp` |
| 8 | Footer — iletişim & sosyal medya | Footer | `#iletisim` |

Gizlenenler (`nextgen.css`): SSS bölümü, hero/header'daki Uplink logo işareti,
day_1/day_2 ve bilet sekmeleri, geri sayım, yasal sayfa linkleri, "Made in Framer" rozeti.

## Bilinen sınırlamalar

- **CMS verisi export'a dahil değil.** Sadece ilk görünüm (hydration verisi) çalışıyor;
  yeni CMS sorgusu gerektiren etkileşimler (gün/bilet sekmeleri, SSS filtreleri) boş döner.
  Bu yüzden o kontroller gizlendi.
- `/speakers` ve `/schedule` sayfaları hâlâ Uplink içeriği taşıyor ve menüden kaldırıldı;
  `/contact`, `/legal/*`, `/docs/*` sayfaları export'ta yok.
- Export dosyalarının tarihi 1980; tarayıcılar bunları yıllarca önbellekte tutabilir.
  Yayında HTML ve `.mjs` dosyaları için `Cache-Control: no-cache` (veya kısa max-age) kullan.
- Template'in kendi SSR/hydration uyumsuzluk uyarısı (konsolda "recoverable error")
  orijinal export'ta da var; site çalışmaya devam ediyor.

## Beklenen içerikler

Aşağıdakiler geçici metin/placeholder olarak duruyor:

- Logo (header'da şimdilik metin: **NextGen Developers · KTÜ**), favicon, sosyal paylaşım görseli
- Sosyal medya hesapları ve e-posta adresi (footer'daki "Sosyal medya", "E-posta")
- Üyelik başvuru yöntemi/formu (katıl/ → "Üyelik bilgisi yakında")
- Etkinlik/atölye tarihleri ve başlıkları (etkinlikler/ → "yakında")
- Faaliyet/odak alanlarının kesin listesi (faaliyetler/ ve hero çubukları — taslak)
- Üye projeleri: ad, açıklama, görsel (projeler/ → `proje_01…12`)
- Topluluk fotoğrafları (kampüs/ galeri kartları, hero çubukları)
- Topluluk ilkeleri metninin onayı (yaklaşım/)
- SSS içeriği (bölüm gizli)
