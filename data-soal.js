window.LKPD_DATA = {
settings: {
    sessionKey: "lkpd_bab1_session_v4",  // v3: struktur listening berubah → jawaban lama tidak terbawa
    stateKey:   "lkpd_bab1_state_v4",
    listeningPlayCount: 2,               // audio asli diputar otomatis 2x (standar JFT/聴解)
    showListeningControls: false         // false = ujian (siswa tak bisa ulang sendiri); true = latihan
},

  tabs: [
    {
      id: "panduan",
      label: "Panduan",
      type: "static",
      html: `
        <h2>Panduan LKPD</h2>

        <div class="note">
          LKPD ini disusun berdasarkan materi <strong>Bab 1</strong> dan diselaraskan dengan kemampuan
          <strong>CEFR A2 / JFT-Basic</strong> untuk kebutuhan LPK.
        </div>

        <h3>A. Tujuan Pembelajaran</h3>
        <p>Setelah mengerjakan LKPD ini, peserta didik diharapkan mampu:</p>
        <ol>
          <li>Memahami dan menggunakan ungkapan perkenalan diri sederhana di tempat kerja.</li>
          <li>Memahami nama, peran, dan fungsi orang-orang di tempat kerja ketika diperkenalkan.</li>
          <li>Memilih respons yang tepat dalam percakapan perkenalan, pertanyaan tentang asal, hobi, pengalaman kerja, dan prosedur kantor.</li>
          <li>Memahami informasi lisan sederhana tentang nama, arti nama, tempat asal, pengalaman kerja, hobi, dan perubahan tempat rapat.</li>
          <li>Membaca teks pendek fungsional seperti perkenalan diri, pengenalan staf, deskripsi kota, dan memo rapat.</li>
          <li>Menguasai kosakata dan kanji dasar Bab 1.</li>
          <li>Menerjemahkan kalimat pendek menggunakan pola Bab 1.</li>
        </ol>

        <h3>B. Can-do Statements Setara A2 / JFT-Basic</h3>
        <table>
          <tr><th>No</th><th>Can-do Statement</th></tr>
          <tr><td>1</td><td>Saya dapat memperkenalkan diri secara sederhana ketika pertama kali bekerja di perusahaan Jepang.</td></tr>
          <tr><td>2</td><td>Saya dapat memahami nama dan peran staf ketika diperkenalkan di tempat kerja.</td></tr>
          <tr><td>3</td><td>Saya dapat memahami pertanyaan sederhana tentang asal, pekerjaan dulu, hobi, dan pengalaman belajar bahasa Jepang.</td></tr>
          <tr><td>4</td><td>Saya dapat bercerita secara sederhana tentang kota atau daerah tempat asal saya.</td></tr>
          <tr><td>5</td><td>Saya dapat menulis perkenalan diri sederhana untuk komunitas belajar bahasa Jepang di media sosial.</td></tr>
          <tr><td>6</td><td>Saya dapat memahami pengumuman atau memo singkat tentang perubahan waktu/tempat rapat.</td></tr>
        </table>

        <h3>C. Struktur Asesmen</h3>
        <table>
          <tr><th>Bagian</th><th>Jumlah</th><th>Fungsi</th></tr>
          <tr><td>Mini JFT-like: 文字・語彙, 会話表現, 聴解, 読解</td><td>30 soal</td><td>Mengukur kesiapan format JFT-Basic</td></tr>
          <tr><td>Kanji</td><td>10 soal</td><td>Pendukung penguasaan 文字・語彙</td></tr>
          <tr><td>Kosakata</td><td>10 soal</td><td>Pendukung penguasaan ungkapan Bab 1</td></tr>
          <tr><td>Terjemahan</td><td>5 soal</td><td>Penguatan pola kalimat dan produksi bahasa</td></tr>
        </table>

        <h3>D. Standar Kelulusan Internal LPK</h3>
        <table>
          <tr><th>Kriteria</th><th>Standar</th></tr>
          <tr><td>Nilai Akhir Bab</td><td>≥ 75</td></tr>
          <tr><td>Nilai Ujian Bab / Mini JFT-like</td><td>≥ 70</td></tr>
          <tr><td>Nilai Kanji</td><td>≥ 70</td></tr>
          <tr><td>Nilai Kosakata</td><td>≥ 70</td></tr>
          <tr><td>Nilai Terjemahan</td><td>≥ 60</td></tr>
          <tr><td>Minimum per section JFT-like</td><td>≥ 60%</td></tr>
        </table>

        <div class="warning">
          <strong>Penting:</strong> Skor kesiapan JFT-Basic hanya dihitung dari 4 section resmi:
          文字・語彙, 会話表現, 聴解, dan 読解.
          Kanji, Kosakata, dan Terjemahan adalah komponen pendukung pembelajaran LPK.
        </div>

        <h3>E. Cara Menggunakan Laman Ini</h3>
        <ol>
          <li>Pilih login <strong>Peserta</strong> atau <strong>Guru</strong>.</li>
          <li>Peserta mengisi nama, kelas, dan tanggal.</li>
          <li>Guru memasukkan password. Password default: <strong>guru123</strong>.</li>
          <li>Untuk 聴解, klik tombol <strong>Putar Audio</strong>. Audio diputar menggunakan teks-ke-suara browser.</li>
          <li>Jika suara bahasa Jepang tidak tersedia, guru dapat membacakan naskah audio setelah login sebagai guru.</li>
          <li>Klik <strong>Hitung Nilai</strong> untuk melihat hasil dan umpan balik.</li>
          <li>Jawaban tersimpan otomatis di browser ini.</li>
        </ol>
      `
    },

    {
      id: "materi",
      label: "Materi",
      type: "static",
      html: `
        <h2>Ringkasan Materi Bab 1</h2>

        <h3>1. Kosakata Penting</h3>
        <table>
          <tr><th>Bahasa Jepang</th><th>Bacaan</th><th>Arti</th></tr>
          <tr><td class="ja">自己紹介</td><td class="ja">じこしょうかい</td><td>perkenalan diri</td></tr>
          <tr><td class="ja">職場</td><td class="ja">しょくば</td><td>tempat kerja</td></tr>
          <tr><td class="ja">スタッフ</td><td class="ja">—</td><td>staf</td></tr>
          <tr><td class="ja">主任</td><td class="ja">しゅにん</td><td>kepala bagian / supervisor</td></tr>
          <tr><td class="ja">パート</td><td class="ja">—</td><td>pekerja paruh waktu</td></tr>
          <tr><td class="ja">担当</td><td class="ja">たんとう</td><td>penanggung jawab</td></tr>
          <tr><td class="ja">手続き</td><td class="ja">てつづき</td><td>prosedur / formalitas</td></tr>
          <tr><td class="ja">出身</td><td class="ja">しゅっしん</td><td>asal / tempat lahir</td></tr>
          <tr><td class="ja">呼び方</td><td class="ja">よびかた</td><td>cara memanggil</td></tr>
          <tr><td class="ja">趣味</td><td class="ja">しゅみ</td><td>hobi</td></tr>
          <tr><td class="ja">経験</td><td class="ja">けいけん</td><td>pengalaman</td></tr>
          <tr><td class="ja">観光地</td><td class="ja">かんこうち</td><td>tempat wisata</td></tr>
          <tr><td class="ja">首都</td><td class="ja">しゅと</td><td>ibu kota</td></tr>
          <tr><td class="ja">都会</td><td class="ja">とかい</td><td>kota besar</td></tr>
          <tr><td class="ja">高原</td><td class="ja">こうげん</td><td>dataran tinggi</td></tr>
          <tr><td class="ja">海</td><td class="ja">うみ</td><td>laut</td></tr>
          <tr><td class="ja">山</td><td class="ja">やま</td><td>gunung</td></tr>
          <tr><td class="ja">川</td><td class="ja">かわ</td><td>sungai</td></tr>
          <tr><td class="ja">島</td><td class="ja">しま</td><td>pulau</td></tr>
          <tr><td class="ja">森</td><td class="ja">もり</td><td>hutan</td></tr>
          <tr><td class="ja">にぎやか</td><td class="ja">—</td><td>ramai</td></tr>
          <tr><td class="ja">のんびり</td><td class="ja">—</td><td>santai / tenang</td></tr>
          <tr><td class="ja">一生懸命</td><td class="ja">いっしょうけんめい</td><td>sungguh-sungguh</td></tr>
          <tr><td class="ja">頑張ります</td><td class="ja">がんばります</td><td>berusaha keras</td></tr>
        </table>

        <h3>2. Tata Bahasa Utama</h3>

        <details open>
          <summary class="ja">① N1 という N2</summary>
          <p>Digunakan untuk memperkenalkan nama, arti, atau sesuatu yang dianggap baru diketahui lawan bicara.</p>
          <p class="ja">例：ホアは「花」という意味です。</p>
          <p class="ja">例：ベトナムのダナンという町から来ました。</p>
        </details>

        <details>
          <summary class="ja">② V-たばかりです</summary>
          <p>Menyatakan bahwa suatu tindakan baru saja terjadi.</p>
          <p class="ja">例：先週、日本に来たばかりです。</p>
          <p class="ja">例：さっき空港に着いたばかりです。</p>
        </details>

        <details>
          <summary class="ja">③ V-ていました</summary>
          <p>Menyatakan keadaan atau aktivitas di masa lampau.</p>
          <p class="ja">例：国ではホテルで働いていました。</p>
          <p class="ja">例：ツアーガイドの仕事をしていました。</p>
        </details>

        <details>
          <summary class="ja">④ そこ</summary>
          <p>Dapat merujuk pada tempat atau hal yang sudah disebutkan sebelumnya.</p>
          <p class="ja">例：ジャワ島にジョグジャカルタという大きい町があります。ウォノソボはそこからバスで4時間ぐらいです。</p>
        </details>

        <details>
          <summary class="ja">⑤ ～て / ～から / ～けど</summary>
          <table>
            <tr><th>Pola</th><th>Fungsi</th><th>Contoh</th></tr>
            <tr><td class="ja">～て</td><td>menderetkan informasi</td><td class="ja">お茶の畑がたくさんあって、のんびりしています。</td></tr>
            <tr><td class="ja">～から</td><td>alasan / sebab</td><td class="ja">首都だから、都会です。</td></tr>
            <tr><td class="ja">～けど</td><td>kontras / tetapi</td><td class="ja">首都ではないけど、にぎやかです。</td></tr>
          </table>
        </details>
      `
    },

    {
      id: "moji",
      label: "1. 文字・語彙",
      type: "questions",
      items: [
        {
          id: "q1",
          type: "mcq",
          number: "Soal 1.",
          prompt: "新しい職場で、自分の（   ）をします。",
          options: ["手続き", "自己紹介", "担当", "経験"],
          answer: 2
        },
        {
          id: "q2",
          type: "mcq",
          number: "Soal 2.",
          prompt: "仕事のことは、（   ）の川崎さんに聞いてください。",
          options: ["パート", "出身", "主任", "趣味"],
          answer: 3
        },
        {
          id: "q3",
          type: "mcq",
          number: "Soal 3.",
          prompt: "休みや手続きのことは、山下さんが（   ）です。",
          options: ["経験", "意味", "呼び方", "担当"],
          answer: 4
        },
        {
          id: "q4",
          type: "mcq",
          number: "Soal 4.",
          prompt: "私はインドネシアのウォノソボ（   ）町から来ました。",
          options: ["について", "という", "のために", "によって"],
          answer: 2
        },
        {
          id: "q5",
          type: "mcq",
          number: "Soal 5.",
          prompt: "先週日本に来た（   ）です。",
          options: ["ところ", "まえ", "ばかり", "あと"],
          answer: 3
        },
        {
          id: "q6",
          type: "mcq",
          number: "Soal 6.",
          prompt: "「経験」の読み方はどれですか。",
          options: ["せいかん", "けいけん", "きょうけん", "けいこう"],
          answer: 2
        },
        {
          id: "q7",
          type: "mcq",
          number: "Soal 7.",
          prompt: "「観光地」の読み方はどれですか。",
          options: ["かんこうじ", "せんこうち", "かんこうち", "かんこうしゃ"],
          answer: 3
        },
        {
          id: "q8",
          type: "mcq",
          number: "Soal 8.",
          prompt: "「のんびり」の意味はどれですか。",
          options: ["にぎやか", "たかい", "ゆったり", "とおい"],
          answer: 3
        },
        {
          id: "q9",
          type: "mcq",
          number: "Soal 9.",
          prompt: "「手続き」の意味として最も適切なのはどれですか。",
          options: ["遊びに行くこと", "名前を呼ぶこと", "天気を調べること", "書類やルールに従って行うこと"],
          answer: 4
        },
        {
          id: "q10",
          type: "mcq",
          number: "Soal 10.",
          prompt: "「森」の意味はどれですか。",
          options: ["川や海のこと", "木がたくさんあるところ", "高い山のこと", "人が多い町のこと"],
          answer: 2
        }
      ]
    },

    {
      id: "kaiwa",
      label: "2. 会話表現",
      type: "questions",
      items: [
        {
          id: "q11",
          type: "mcq",
          number: "Soal 11.",
          prompt: "同僚：「こちらは主任の川崎さんです。」<br>あなた：「＿＿＿。」",
          options: [
            "いいえ、私は主任ではありません。",
            "川崎さん、はじめまして。どうぞよろしくお願いします。",
            "川崎さんは仕事がありません。",
            "これは主任ではありません。"
          ],
          answer: 2
        },
        {
          id: "q12",
          type: "mcq",
          number: "Soal 12.",
          prompt: "日本人：「ホアさんはどういう意味ですか。」<br>ホア：「＿＿＿。」",
          options: [
            "ホアはベトナムから来ました。",
            "ホアは先週日本に来ました。",
            "ホアは「花」という意味です。",
            "ホアはホテルで働いていました。"
          ],
          answer: 3
        },
        {
          id: "q13",
          type: "mcq",
          number: "Soal 13.",
          prompt: "上司：「日本に来たのはいつですか。」<br>あなた：「＿＿＿。」",
          options: [
            "日本は大きいです。",
            "先週、日本に来たばかりです。",
            "仕事は会議です。",
            "名前は田中です。"
          ],
          answer: 2
        },
        {
          id: "q14",
          type: "mcq",
          number: "Soal 14.",
          prompt: "日本人：「国ではどんな仕事をしていましたか。」<br>あなた：「＿＿＿。」",
          options: [
            "日本語を勉強しています。",
            "趣味は音楽です。",
            "ホテルで働いていました。",
            "明日は会議です。"
          ],
          answer: 3
        },
        {
          id: "q15",
          type: "mcq",
          number: "Soal 15.",
          prompt: "友達：「趣味は何ですか。」<br>あなた：「＿＿＿。」",
          options: [
            "バスで4時間です。",
            "音楽を聴くことです。",
            "首都ではないけどにぎやかです。",
            "手続きの担当です。"
          ],
          answer: 2
        },
        {
          id: "q16",
          type: "mcq",
          number: "Soal 16.",
          prompt: "マデ：「手続きのことは誰に聞けばいいですか。」<br>横田：「＿＿＿。」",
          options: [
            "私は山下さんではありません。",
            "手続きは難しいです。",
            "山下さんに聞いてください。",
            "山下さんは今日休んでいます。"
          ],
          answer: 3
        },
        {
          id: "q17",
          type: "mcq",
          number: "Soal 17.",
          prompt: "A：「ジャワ島にジョグジャカルタという大きい町があります。」<br>B：「（   ）はどんな町ですか。」",
          options: ["それ", "これ", "そこ", "あれ"],
          answer: 3
        },
        {
          id: "q18",
          type: "mcq",
          number: "Soal 18.",
          prompt: "A：「ウォノソボは首都ですか。」<br>B：「いいえ、首都ではない（   ）、のんびりしている町です。」",
          options: ["から", "て", "の", "けど"],
          answer: 4
        }
      ]
    },

    {
  id: "choikai",
  label: "3. 聴解",
  type: "questions",
  items: [
    {
      id: "q19", type: "listening", number: "Soal 19.",
      prompt: "川崎さんはどんな人ですか。",
      options: ["主任", "パート", "会社でいちばん長い", "中国出身"],
      answer: 1,
      audioUrl: "audio/Z_[01-01]_kiku1.mp3",
      script: "こちらは、主任の川崎さん。仕事のことは、川崎さんに聞いてください。川崎です。よろしくお願いします。"
    },
    {
      id: "q20", type: "listening", number: "Soal 20.",
      prompt: "渡辺さんに何について聞くといいですか。",
      options: ["仕事のこと", "会社のいろいろなこと", "日本の生活のこと", "手続きのこと"],
      answer: 2,
      audioUrl: "audio/Z_[01-02]_kiku2.mp3",
      script: "こちらは、渡辺さん。この会社では、いちばん長いです。何でも知ってるから、会社のいろいろなことは、渡辺さんに聞いてください。"
    },
    {
      id: "q21", type: "listening", number: "Soal 21.",
      prompt: "山下さんの担当は何ですか。",
      options: ["仕事のこと", "会社のいろいろなこと", "日本の生活のこと", "休みと手続きのこと"],
      answer: 4,
      audioUrl: "audio/Z_[01-04]_kiku4.mp3",
      script: "それから、こちらは、パートの山下さん。休みとか、手続きのことは、山下さんが担当です。"
    },
    {
      id: "q22", type: "listening", number: "Soal 22.",
      prompt: "ホアさんは国でどんな仕事をしていましたか。",
      options: ["ホテル", "学校", "会社", "工場"],
      answer: 1,
      audioUrl: "audio/Z_[01-05]_kaiwa.mp3",
      script: "ベトナムでは、どんな仕事をしてましたか。ホテルで働いていました。"
    },
    {
      id: "q23", type: "listening", number: "Soal 23.",
      prompt: "ウォノソボはどんな町ですか。",
      options: ["にぎやかな首都", "高いビルが多い都会", "高原の町でのんびりしている", "海がきれいな観光地"],
      answer: 3,
      audioUrl: "audio/Z_[01-13]_kiku4.mp3",
      script: "高原の町です。お茶の畑がたくさんあって、のんびりしています。"
    },
    {
      id: "q24", type: "listening", number: "Soal 24.",
      prompt: "ホーチミンについて正しいものはどれですか。",
      options: ["首都である", "静かである", "にぎやかでレストランが多い", "観光客が少ない"],
      answer: 3,
      audioUrl: "audio/Z_[01-12]_kiku3.mp3",
      script: "首都ではないけど、とてもにぎやかです。安くておいしいレストランがたくさんあります。"
    }
  ]
},

    {
      id: "dokkai",
      label: "4. 読解",
      type: "questions",
      items: [
        {
          id: "q25",
          type: "mcq",
          number: "Soal 25.",
          passage: "はじめまして。田中と申します。田中と呼んでください。<br>インドネシアのウォノソボという町から来ました。<br>先週日本に来たばかりです。<br>趣味は音楽を聴くことです。<br>日本語は来る前に1年勉強しました。<br>まだ分かりませんが、頑張ります。<br>よろしくお願いします。",
          prompt: "田中さんはいつ日本に来ましたか。",
          options: ["先月", "先週", "去年", "来年"],
          answer: 2
        },
        {
          id: "q26",
          type: "mcq",
          number: "Soal 26.",
          passage: "マデさん、みんなを紹介しますね。<br>川の崎さんは主任です。仕事のことを教えてください。<br>渡辺さんはこの会社で一番長いです。会社のいろいろなことを知っています。<br>林さんは中国出身で、日本の生活に強いです。<br>山下さんはパートで、休みと手続きの担当です。",
          prompt: "手続きのことは誰に聞きますか。",
          options: ["川崎さん", "渡辺さん", "林さん", "山下さん"],
          answer: 4
        },
        {
          id: "q27",
          type: "mcq",
          number: "Soal 27.",
          passage: "セブはフィリピンの有名な観光地です。海がきれいで、観光客が多いです。日本から飛行機で5時間ぐらいです。<br>ホーチミンはベトナムの南にある大きい町です。首都ではないけど、にぎやかで、安くておいしいレストランがたくさんあります。",
          prompt: "ホーチミンについて正しいのはどれですか。",
          options: ["首都である", "静かである", "観光客が少ない", "にぎやかでレストランが多い"],
          answer: 4
        },
        {
          id: "q28",
          type: "mcq",
          number: "Soal 28.",
          passage: "田中さんへ<br>明日の会議は10時からです。<br>場所は3階の会議室から2階のロビーに変わりました。<br>8時50分までに集まってください。<br>山田",
          prompt: "明日の会議の場所はどこですか。",
          options: ["3階の会議室", "教室", "2階のロビー", "事務所"],
          answer: 3
        },
        {
          id: "q29",
          type: "mcq",
          number: "Soal 29.",
          passage: "A：出身はどちらですか。<br>B：インドネシアのウォノソボという町です。<br>A：そこはどんなところですか。<br>B：高原の町です。お茶の畑がたくさんあって、のんびりしています。<br>A：ジョグジャカルタからどのぐらいかかりますか。<br>B：バスで4時間ぐらいです。",
          prompt: "ウォノソボはどんな町ですか。",
          options: ["高いビルが多い都会", "海がきれいな観光地", "高原の町でのんびりしている町", "首都でにぎやかな町"],
          answer: 3
        },
        {
          id: "q30",
          type: "mcq",
          number: "Soal 30.",
          passage: "私の町は海が近いですが、静かです。<br>夏は観光客がたくさん来て、にぎやかになります。<br>冬は人が少ないですが、のんびりできます。<br>町の名前は「花の町」という意味です。",
          prompt: "この町について正しいのはどれですか。",
          options: ["冬は観光客が多い", "夏はにぎやかになる", "町の名前は「山」という意味", "海から遠い"],
          answer: 2
        }
      ]
    },

    {
      id: "kanji",
      label: "5. Kanji",
      type: "questions",
      items: [
        {
          id: "q31",
          type: "mcq",
          number: "Soal 31.",
          prompt: "「山」の読み方はどれですか。",
          options: ["かわ", "やま", "うみ", "もり"],
          answer: 2
        },
        {
          id: "q32",
          type: "mcq",
          number: "Soal 32.",
          prompt: "「客」の読み方はどれですか。",
          options: ["せき", "かい", "きゃく", "りょう"],
          answer: 3
        },
        {
          id: "q33",
          type: "mcq",
          number: "Soal 33.",
          prompt: "「川」の読み方はどれですか。",
          options: ["かわ", "やま", "うみ", "しま"],
          answer: 1
        },
        {
          id: "q34",
          type: "mcq",
          number: "Soal 34.",
          prompt: "「海」の読み方はどれですか。",
          options: ["かわ", "うみ", "やま", "もり"],
          answer: 2
        },
        {
          id: "q35",
          type: "mcq",
          number: "Soal 35.",
          prompt: "「島」の読み方はどれですか。",
          options: ["うみ", "やま", "かわ", "しま"],
          answer: 4
        },
        {
          id: "q36",
          type: "mcq",
          number: "Soal 36.",
          prompt: "「森」の意味はどれですか。",
          options: ["水が流れているところ", "木がたくさんあるところ", "高い山", "広い海"],
          answer: 2
        },
        {
          id: "q37",
          type: "mcq",
          number: "Soal 37.",
          prompt: "「経験」の意味はどれですか。",
          options: ["名前を呼ぶこと", "書類の手順", "実際にやってみたこと", "天気の予報"],
          answer: 3
        },
        {
          id: "q38",
          type: "mcq",
          number: "Soal 38.",
          prompt: "「観光地」の意味はどれですか。",
          options: ["仕事をするところ", "休むところ", "観光客が見物に行くところ", "勉強するところ"],
          answer: 3
        },
        {
          id: "q39",
          type: "mcq",
          number: "Soal 39.",
          prompt: "「意味」の意味はどれですか。",
          options: ["人の名前", "言葉や名前が表す内容", "町の位置", "仕事の役割"],
          answer: 2
        },
        {
          id: "q40",
          type: "mcq",
          number: "Soal 40.",
          prompt: "「漢字」の読み方はどれですか。",
          options: ["かんこ", "ともじ", "かんじ", "まじ"],
          answer: 3
        }
      ]
    },

    {
      id: "kosakata",
      label: "6. Kosakata",
      type: "questions",
      items: [
        { id: "k41", type: "vocab", number: "41.", prompt: "perkenalan diri", accepted: ["自己紹介", "じこしょうかい", "jikoshoukai", "jikoshokai"] },
        { id: "k42", type: "vocab", number: "42.", prompt: "tempat kerja", accepted: ["職場", "しょくば", "shokuba"] },
        { id: "k43", type: "vocab", number: "43.", prompt: "penanggung jawab", accepted: ["担当", "たんとう", "tantou", "tanto"] },
        { id: "k44", type: "vocab", number: "44.", prompt: "prosedur / formalitas", accepted: ["手続き", "てつづき", "tetsuzuki", "tetszuki"] },
        { id: "k45", type: "vocab", number: "45.", prompt: "asal / tempat lahir", accepted: ["出身", "しゅっしん", "shusshin", "shushin"] },
        { id: "k46", type: "vocab", number: "46.", prompt: "cara memanggil", accepted: ["呼び方", "よびかた", "yobikata"] },
        { id: "k47", type: "vocab", number: "47.", prompt: "hobi", accepted: ["趣味", "しゅみ", "shumi"] },
        { id: "k48", type: "vocab", number: "48.", prompt: "pengalaman", accepted: ["経験", "けいけん", "keiken"] },
        { id: "k49", type: "vocab", number: "49.", prompt: "tempat wisata", accepted: ["観光地", "かんこうち", "kankouchi", "kankochi"] },
        { id: "k50", type: "vocab", number: "50.", prompt: "santai / tenang", accepted: ["のんびり", "nonbiri"] }
      ]
    },

    {
      id: "terjemahan",
      label: "7. Terjemahan",
      type: "questions",
      items: [
        {
          id: "tr1",
          type: "translation",
          number: "Soal T1.",
          prompt: "Saya baru saja datang ke Jepang minggu lalu.",
          sample: "先週、日本に来たばかりです。"
        },
        {
          id: "tr2",
          type: "translation",
          number: "Soal T2.",
          prompt: "Dulu saya bekerja di hotel di negara saya.",
          sample: "国ではホテルで働いていました。 / 私の国ではホテルで働いていました。"
        },
        {
          id: "tr3",
          type: "translation",
          number: "Soal T3.",
          prompt: "Nama saya Hoa. Hoa berarti “bunga”.",
          sample: "私はホアと申します。ホアは「花」という意味です。 / 名前はホアです。ホアは「花」という意味です。"
        },
        {
          id: "tr4",
          type: "translation",
          number: "Soal T4.",
          prompt: "Kota saya bukan ibu kota, tetapi sangat ramai.",
          sample: "私の町は首都ではないけど、とてもにぎやかです。"
        },
        {
          id: "tr5",
          type: "translation",
          number: "Soal T5.",
          prompt: "Dari Yogyakarta ke Wonosobo sekitar 4 jam dengan bus.",
          sample: "ウォノソボはジョグジャカルタからバスで4時間ぐらいです。 / ジョグジャカルタからウォノソボまでバスで4時間ぐらいです。"
        }
      ]
    },

    {
  id: "bankaudio",
  label: "🎧 Bank Audio Bab 1",
  type: "audiobank",
  items: [
    { track: "01-01", file: "Z_[01-01]_kiku1.mp3", title: "聞きましょう① — 川崎（主任／仕事）" },
    { track: "01-02", file: "Z_[01-02]_kiku2.mp3", title: "聞きましょう① — 渡辺（会社で一番長い／会社のいろいろ）" },
    { track: "01-03", file: "Z_[01-03]_kiku3.mp3", title: "聞きましょう① — 林（中国出身／日本の生活）" },
    { track: "01-04", file: "Z_[01-04]_kiku4.mp3", title: "聞きましょう① — 山下（パート／休みと手続き）" },
    { track: "01-05", file: "Z_[01-05]_kaiwa.mp3", title: "聞きましょう（本文） — 自己紹介：ホア" },
    { track: "01-06", file: "Z_[01-06]_katachi.mp3", title: "形に注目 — ～という／たばかり／ていました" },
    { track: "01-07", file: "Z_[01-07]_hanasu.mp3", title: "話しましょう — model 自己紹介（シャドーイング）" },
    { track: "01-08", file: "Z_[01-08]_kotoba1.mp3", title: "ことばの準備 — 方角と自然" },
    { track: "01-09", file: "Z_[01-09]_kotoba2.mp3", title: "ことばの準備（選ぶ a–l）" },
    { track: "01-10", file: "Z_[01-10]_kiku1.mp3", title: "聞きましょう① — セブ（観光地／海／飛行機5時間）" },
    { track: "01-11", file: "Z_[01-11]_kiku2.mp3", title: "聞きましょう① — ウランバートル（首都／都会／高いビル）" },
    { track: "01-12", file: "Z_[01-12]_kiku3.mp3", title: "聞きましょう① — ホーチミン（南／にぎやか／レストラン）" },
    { track: "01-13", file: "Z_[01-13]_kiku4.mp3", title: "聞きましょう① — ウォノソボ（高原／お茶の畑／のんびり）" },
    { track: "01-14", file: "Z_[01-14]_katachi1.mp3", title: "形に注目① — そこ" },
    { track: "01-15", file: "Z_[01-15]_katachi2.mp3", title: "形に注目② — ～て／～から／～けど" },
    { track: "01-16", file: "Z_[01-16]_hanasu.mp3", title: "話しましょう — dialog kota（シャドーイング）" }
  ]
},

    {
      id: "hasil",
      label: "Hasil & Umpan Balik",
      type: "result"
    },

    {
      id: "refleksi",
      label: "Refleksi",
      type: "static",
      html: `
        <h2>Refleksi Peserta Didik</h2>
        <p>Isilah refleksi berikut setelah menyelesaikan LKPD.</p>

        <div class="question-card">
          <label><strong>1. Bagian mana yang paling saya kuasai?</strong></label>
          <textarea id="ref1" rows="2"></textarea>
        </div>

        <div class="question-card">
          <label><strong>2. Bagian mana yang masih sulit?</strong></label>
          <textarea id="ref2" rows="2"></textarea>
        </div>

        <div class="question-card">
          <label><strong>3. Kosakata apa yang belum saya hafal?</strong></label>
          <textarea id="ref3" rows="2"></textarea>
        </div>

        <div class="question-card">
          <label><strong>4. Kanji apa yang masih sulit dibaca?</strong></label>
          <textarea id="ref4" rows="2"></textarea>
        </div>

        <div class="question-card">
          <label><strong>5. Pola kalimat apa yang masih sering salah?</strong></label>
          <textarea id="ref5" rows="2"></textarea>
        </div>

        <div class="question-card">
          <label><strong>6. Apa yang akan saya lakukan untuk memperbaiki kelemahan saya?</strong></label>
          <textarea id="ref6" rows="3"></textarea>
        </div>
      `
    }
  ]
};