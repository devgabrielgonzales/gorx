# Hero cinematográfico

Vídeo gerado na OpenArt com Seedance 2.5 (`byte-plus-seedance-2-5`, `text2video`).
Geração: `zNoemz5EUWMoLwT4d2kd`. Configuração: 1 vídeo, 8 segundos, 1080p, 16:9, sem áudio.
Saída conferida: 1920 × 1080, 24 fps, duração de 8,041667 segundos.
Estimativa informada antes da geração: 2.565 créditos; não representa comprovante de cobrança.

[Arquivo original da OpenArt](https://cdn.openart.ai/openart-ai/production/2026-09/create-video/fPEekUzzSYkRTsJE6um3/cgt-20260918225826-f4w9y_1789743692470_f7b77041.mp4)

## Direção da cena

Rochas de basalto e granito escuras, suspensas em fundo preto, com textura mineral realista e iluminação lateral verde-lima #BFF549. Uma tomada contínua, com avanço lento de câmera entre as pedras, rotação discreta e espaço central para o título em HTML. Sem texto, logos, dispositivos, pessoas, cortes ou flashes. As imagens de Fortnari e Ideal inspiraram a descrição; não foram enviadas como referências para o modelo.

## Arquivos servidos pelo site

- `public/video/rocks-desktop.mp4`: 1080p, H.264, CRF 23.
- `public/video/rocks-mobile.mp4`: 720p, H.264, CRF 25, usado até 700 px.
- `public/images/rocks-poster.webp`: primeiro frame, qualidade 85.

Os dois MP4 usam `yuv420p`, `faststart` e keyframes a cada 12 frames para buscas durante o scroll. O site não acessa a OpenArt em runtime.

## Reproduzir a otimização

Com FFmpeg disponível, execute a partir da raiz, usando o arquivo original como entrada. Os comandos não sobrescrevem arquivos sem confirmação.

```sh
ffmpeg -i /caminho/original.mp4 -an -c:v libx264 -preset slow -crf 23 -g 12 -keyint_min 12 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/video/rocks-desktop.mp4
ffmpeg -i /caminho/original.mp4 -an -vf scale=1280:720 -c:v libx264 -preset slow -crf 25 -g 12 -keyint_min 12 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/video/rocks-mobile.mp4
ffmpeg -ss 0 -i /caminho/original.mp4 -frames:v 1 -c:v libwebp -quality 85 public/images/rocks-poster.webp
```

## Comportamento

O ScrollTrigger sincroniza o vídeo enquanto o hero sai naturalmente do viewport, sem fixar a seção nem adicionar espaço à rolagem. O primeiro frame precisa estar disponível antes da sincronização. Uma única busca fica em andamento; a seguinte usa a posição mais recente do scroll. Resize entre breakpoints recria a configuração, e a desmontagem remove eventos e animações. Movimento reduzido não carrega MP4. Erro de vídeo mantém o poster e o conteúdo.
