/* =====================================================================
   แก้เนื้อหาทั้งหมดของพอร์ตที่ไฟล์นี้ไฟล์เดียว (ข้อความที่ขึ้นต้นด้วย [ ] คือที่ว่างให้เติม)
   Edit all portfolio content here. Anything in [ ] is a placeholder.
   ===================================================================== */
window.CONTENT = {
  th: {
    brand: "[ชื่อของคุณ]",
    nav: { about: "เกี่ยวกับฉัน", skills: "ทักษะ", projects: "ผลงาน", journey: "เส้นทาง", contact: "ติดต่อ" },
    hero: {
      eyebrow: "การตลาด × ผลิตภัณฑ์และนวัตกรรม",
      title: "เปลี่ยนความเข้าใจลูกค้า<br>ให้เป็นแคมเปญและผลิตภัณฑ์ที่ขายได้",
      lead: "[ชื่อ-นามสกุล] — [ตำแหน่ง/สถานะ เช่น นักศึกษาปี 4 สาขาการตลาด] สนใจการวางแผนแคมเปญ การสร้างคอนเทนต์ และการพัฒนาผลิตภัณฑ์จากข้อมูลและ insight ลูกค้า",
      cta1: "ดูผลงาน", cta2: "ติดต่อฉัน"
    },
    stats: [
      { n: "[0]", l: "แคมเปญ/โปรเจกต์" },
      { n: "[0]", l: "ปีประสบการณ์" },
      { n: "[0%]", l: "ผลลัพธ์เด่น เช่น Engagement ที่เพิ่มขึ้น" }
    ],
    about: {
      h: "เกี่ยวกับฉัน",
      p: [
        "[เล่าสั้นๆ 3–4 บรรทัด: คุณคือใคร สนใจอะไร อะไรที่ทำให้คุณต่างจากคนอื่น]",
        "[เป้าหมายต่อไป เช่น ต้องการเข้าทำงานตำแหน่ง Marketing Executive หรือเรียนต่อสาขา ...]"
      ]
    },
    skills: {
      h: "ทักษะ",
      groups: [
        { t: "การตลาด", items: ["วางแผนแคมเปญ", "Content Marketing", "Social Media (Facebook)", "วิเคราะห์ลูกค้า / Persona"] },
        { t: "ผลิตภัณฑ์และนวัตกรรม", items: ["Jobs to Be Done", "Value Proposition Canvas", "Design Thinking", "Prototype & ทดสอบสมมติฐาน"] },
        { t: "เครื่องมือ", items: ["Excel / Google Sheets", "Canva", "AI Tools", "HTML / CSS / JavaScript เบื้องต้น"] }
      ]
    },
    projects: {
      h: "ผลงานเด่น",
      items: [
        {
          title: "Marketing Calendar — ระบบวางแผนแคมเปญ",
          role: "ผู้สร้างและออกแบบ · เว็บแอป",
          desc: "เว็บแอปปฏิทินการตลาดที่ใช้วางแผนแคมเปญ แยกตามช่องทาง ติดตามสถานะ และดูภาพรวมผ่านแดชบอร์ด",
          result: "ผลลัพธ์: [เช่น ใช้วางแผนคอนเทนต์ได้ครบทั้งเดือนในที่เดียว]",
          tags: ["Planning", "Dashboard", "JavaScript"],
          link: "../index.html", linkText: "เปิดใช้งานแอป →"
        },
        {
          title: "Facebook Content Marketing — [ชื่อแบรนด์]",
          role: "[บทบาท เช่น Content Planner / Copywriter]",
          desc: "[อธิบายโจทย์ กลุ่มเป้าหมาย และแนวคิดคอนเทนต์ที่ใช้ เช่น Persona → Pain point → โพสต์]",
          result: "ผลลัพธ์: [ตัวเลข เช่น Reach +40%, Engagement +25%]",
          tags: ["Content", "Facebook", "Persona"]
        },
        {
          title: "Product Concept — [ชื่อผลิตภัณฑ์]",
          role: "[บทบาท] · วิชา ITB23167",
          desc: "[อธิบายปัญหาลูกค้า (Job to be done) จุดต่างจากคู่แข่ง และ concept ที่เสนอ]",
          result: "ผลลัพธ์: [เช่น ผ่านการทดสอบกับผู้ใช้ [n] คน / ได้คะแนน ...]",
          tags: ["JTBD", "Value Proposition", "Prototype"]
        },
        {
          title: "[โปรเจกต์ที่ 4]",
          role: "[บทบาท]",
          desc: "[รายละเอียด]",
          result: "ผลลัพธ์: [...]",
          tags: ["[Tag]"]
        }
      ]
    },
    journey: {
      h: "การศึกษาและประสบการณ์",
      items: [
        { when: "[ปี – ปัจจุบัน]", t: "[สถาบัน / สาขา]", d: "[เกรดเฉลี่ย กิจกรรม รางวัล]" },
        { when: "[ปี – ปี]", t: "[บริษัท / ตำแหน่งฝึกงาน]", d: "[สิ่งที่ทำและผลลัพธ์]" },
        { when: "[ปี]", t: "[รางวัล / ใบรับรอง / กิจกรรม]", d: "[รายละเอียด]" }
      ]
    },
    contact: {
      h: "ติดต่อ",
      lead: "สนใจร่วมงาน หรืออยากคุยเพิ่มเติม ติดต่อได้เลย",
      links: [
        { t: "อีเมล", href: "mailto:you@example.com" },
        { t: "LinkedIn", href: "https://www.linkedin.com/in/your-id" },
        { t: "Facebook", href: "https://www.facebook.com/your-id" }
      ]
    },
    footer: "© 2026 [ชื่อของคุณ] · สร้างด้วย HTML/CSS/JS"
  },

  en: {
    brand: "[Your Name]",
    nav: { about: "About", skills: "Skills", projects: "Work", journey: "Journey", contact: "Contact" },
    hero: {
      eyebrow: "Marketing × Product & Innovation",
      title: "Turning customer insight<br>into campaigns and products that sell",
      lead: "[Full name] — [role/status, e.g. final-year Marketing student] interested in campaign planning, content, and building products from data and customer insight.",
      cta1: "View work", cta2: "Contact me"
    },
    stats: [
      { n: "[0]", l: "Campaigns / projects" },
      { n: "[0]", l: "Years of experience" },
      { n: "[0%]", l: "Key result, e.g. engagement uplift" }
    ],
    about: {
      h: "About me",
      p: [
        "[3–4 lines: who you are, what you care about, what sets you apart.]",
        "[Next goal, e.g. seeking a Marketing Executive role or a master's in ...]"
      ]
    },
    skills: {
      h: "Skills",
      groups: [
        { t: "Marketing", items: ["Campaign planning", "Content marketing", "Social media (Facebook)", "Customer analysis / personas"] },
        { t: "Product & Innovation", items: ["Jobs to Be Done", "Value Proposition Canvas", "Design Thinking", "Prototyping & hypothesis testing"] },
        { t: "Tools", items: ["Excel / Google Sheets", "Canva", "AI tools", "Basic HTML / CSS / JavaScript"] }
      ]
    },
    projects: {
      h: "Selected work",
      items: [
        {
          title: "Marketing Calendar — campaign planner",
          role: "Creator & designer · Web app",
          desc: "A web app for planning campaigns by channel, tracking status, and viewing the big picture on a dashboard.",
          result: "Result: [e.g. plans a full month of content in one place]",
          tags: ["Planning", "Dashboard", "JavaScript"],
          link: "../index.html", linkText: "Open the app →"
        },
        {
          title: "Facebook Content Marketing — [Brand]",
          role: "[Role, e.g. Content Planner / Copywriter]",
          desc: "[Brief, target audience, and content approach: persona → pain point → post.]",
          result: "Result: [numbers, e.g. reach +40%, engagement +25%]",
          tags: ["Content", "Facebook", "Persona"]
        },
        {
          title: "Product Concept — [Product name]",
          role: "[Role] · ITB23167 course",
          desc: "[Customer problem (job to be done), differentiation vs. competitors, proposed concept.]",
          result: "Result: [e.g. tested with [n] users / scored ...]",
          tags: ["JTBD", "Value Proposition", "Prototype"]
        },
        {
          title: "[Project 4]",
          role: "[Role]",
          desc: "[Details]",
          result: "Result: [...]",
          tags: ["[Tag]"]
        }
      ]
    },
    journey: {
      h: "Education & experience",
      items: [
        { when: "[Year – Present]", t: "[University / Major]", d: "[GPA, activities, awards]" },
        { when: "[Year – Year]", t: "[Company / Internship role]", d: "[What you did and the outcome]" },
        { when: "[Year]", t: "[Award / Certificate / Activity]", d: "[Details]" }
      ]
    },
    contact: {
      h: "Contact",
      lead: "Open to opportunities and conversations — get in touch.",
      links: [
        { t: "Email", href: "mailto:you@example.com" },
        { t: "LinkedIn", href: "https://www.linkedin.com/in/your-id" },
        { t: "Facebook", href: "https://www.facebook.com/your-id" }
      ]
    },
    footer: "© 2026 [Your Name] · Built with HTML/CSS/JS"
  }
};
