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
| `uplink-copy-site/data/events.json` | **Etkinlikler** (`/etkinlikler/` sayfası) |
| `uplink-copy-site/data/board.json` | **Yönetim kurulu** (ana sayfa bölümü) |
| `uplink-copy-site/etkinlikler/` + `assets/nextgen/events.js`, `site.css` | Framer'sız statik etkinlikler sayfası |
| `uplink-copy-site/assets/nextgen/board.js` | Yönetim kurulu bölümünü ana sayfaya ekleyen betik |
| `tools/site-config.mjs` | Doğrulanmış linkler (üyelik formu, Instagram) |
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

## İçerik güncelleme

Site statik: veri dosyasını düzenle → commit → **yeniden deploy**. Yönetim paneli
veya veritabanı yok; değişiklik yayına ancak yeni deploy ile çıkar.

### Etkinlik ekleme

`uplink-copy-site/data/events.json` içindeki `events` listesine bir nesne ekle:

```json
{
  "events": [
    {
      "title": "Git ve GitHub'a giriş atölyesi",
      "description": "Kısa açıklama.",
      "date": "2026-12-10",
      "time": "18:00",
      "location": "KTÜ, salon adı",
      "online": false,
      "applyUrl": "https://forms.gle/…",
      "status": "basvuru-acik"
    }
  ]
}
```

- `status`: `yaklasan`, `basvuru-acik` veya `tamamlandi`. Tarihi geçen etkinlik
  kendiliğinden "Tamamlandı" altına iner.
- `applyUrl` boşsa ya da `https://…` değilse "Başvur" butonu çıkmaz.
- `time`, `location`, `description`, `applyUrl` isteğe bağlı; `online: true` → "Çevrim içi".
- Liste boşken sayfa "şu an duyurulmuş etkinlik yok" mesajı ve Instagram linki gösterir.
- Örnek veri koyma: gerçek olmayan etkinlik yayına çıkmasın.

### Yönetim kurulu

`uplink-copy-site/data/board.json` → `members` listesi:

```json
{ "members": [ { "name": "Ad Soyad", "role": "Başkan", "photo": "/assets/nextgen/board/ad-soyad.jpg" } ] }
```

Fotoğrafları `uplink-copy-site/assets/nextgen/board/` altına koy (kare görsel önerilir;
`photo` isteğe bağlı). Liste boşken "Yönetim kurulu bilgileri yakında paylaşılacak" görünür.

### Linkler

Üyelik formu ve Instagram `tools/site-config.mjs` içinde kayıtlı; sitede Framer
modüllerine ve HTML'e yazılı durumdalar. Değiştirmek için:
`node tools/replace-text.mjs "<eski URL>" "<yeni URL>"`.

## Ana sayfa bölümleri

| Sıra | NextGen bölümü | Template'deki karşılığı | Anchor |
| --- | --- | --- | --- |
| 1 | Hero (`nextgen ktü`) | Hero | — |
| 2 | yaklaşım/ — topluluk ilkeleri | Last year (alıntı karuseli + istatistikler) | — |
| 3 | faaliyetler/ — öğren / üret / paylaş | Tickets | `#tickets` |
| 4 | etkinlikler/ — etkinlik türleri | Lineup | `#lineup` |
| 5 | projeler/ — üye projeleri | Sponsors | `#sponsors` |
| 6 | yönetim-kurulu/ — `data/board.json` | (yeni, board.js) | `#yonetim-kurulu` |
| 7 | kampüs/ — harita + galeri | Venue | `#venue` |
| 8 | katıl/ — üyelik formu (Google Form) | Call for papers | `#cfp` |
| 9 | Footer — üyelik, Instagram | Footer | — |

Ayrı sayfa: **`/etkinlikler/`** (ana sayfadaki etkinlikler bölümünün "Tüm etkinlikler"
butonu buraya gider). `/schedule/` → `/etkinlikler/`, `/speakers/` → `/#tickets`
yönlendirmesi; bilinmeyen URL'ler `404.html`.

Gizlenenler (`nextgen.css`): hero/header'daki Uplink logo işareti, day_1/day_2 ve
bilet sekmeleri, geri sayım, katıl sekmeleri (konuşmacı/atölye önerisi kaldırıldı).
SSS, yasal linkler, Framer rozeti/editor bar ve Uplink alt sayfaları tamamen kaldırıldı.

## Bilinen sınırlamalar

- **CMS verisi export'a dahil değil.** Sadece ilk görünüm (hydration verisi) çalışıyor;
  yeni CMS sorgusu gerektiren etkileşimler (gün/bilet sekmeleri, SSS filtreleri) boş döner.
  Bu yüzden o kontroller gizlendi.
- Yönetim kurulu bölümü JavaScript ile eklenir (Framer sayfasına yeni bölüm eklemek
  derlenmiş paketi yeniden kurmayı gerektirirdi); JS kapalıyken görünmez.
- Framer router'ı bilinmeyen iç yolları `./`'ye çevirdiği için menü/footer
  "Etkinlikler" linkleri ana sayfadaki bölüme gider; sayfaya bölümdeki buton götürür.
- Export dosyalarının tarihi 1980; tarayıcılar bunları yıllarca önbellekte tutabilir.
  Yayında HTML ve `.mjs` dosyaları için `Cache-Control: no-cache` (veya kısa max-age) kullan.
- Template'in kendi SSR/hydration uyumsuzluk uyarısı (konsolda "recoverable error",
  mobilde) orijinal export'ta da var (28 → temizlikten sonra 7); site çalışıyor.
- Harita kütüphanesi (maplibre) esm.sh/unpkg'den, harita karoları OpenFreeMap'ten
  canlı yüklenir.

## Beklenen içerikler

Aşağıdakiler geçici metin/placeholder olarak duruyor:

- Logo (header'da şimdilik metin: **NextGen Developers · KTÜ**), favicon, sosyal paylaşım görseli
- Alan adı (canonical/og:url/sitemap için mutlak URL gerekir)
- E-posta adresi (footer'da "E-posta · yakında", link yok)
- Yönetim kurulu: isim, görev, fotoğraf (`data/board.json`)
- Etkinlikler (`data/events.json`); ana sayfa etkinlik satırları hâlâ "yakında" etiketli
  etkinlik türleri
- Faaliyet/odak alanlarının kesin listesi (faaliyetler/ ve hero çubukları — taslak)
- Üye projeleri: ad, açıklama, görsel (projeler/ → `proje_01…12`)
- Topluluk fotoğrafları (kampüs/ galeri kartları, hero çubukları)
- Topluluk ilkeleri metninin onayı (yaklaşım/)
- SSS içeriği (bölüm gizli)
