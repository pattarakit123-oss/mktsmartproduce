/* =====================================================================
   แก้เนื้อหาทั้งหมดของพอร์ตที่ไฟล์นี้ไฟล์เดียว (ข้อความที่ขึ้นต้นด้วย [ ] คือที่ว่างให้เติม)
   Edit all portfolio content here. Anything in [ ] is a placeholder.
   ===================================================================== */
window.CONTENT = {
  th: {
    brand: "ภัทรกริช สิทธิวงค์ษา",
    nav: { about: "เกี่ยวกับฉัน", skills: "ทักษะ", projects: "ผลงาน", journey: "เส้นทาง", contact: "ติดต่อ" },
    hero: {
      eyebrow: "นักศึกษาการตลาด · มหาวิทยาลัยศรีปทุม",
      title: "เรียนรู้การตลาดจากการลงมือทำ<br>และจากผู้ปฏิบัติงานจริง",
      lead: "ภัทรกริช สิทธิวงค์ษา นักศึกษาสาขาการตลาด คณะบริหารธุรกิจ มหาวิทยาลัยศรีปทุม ผู้ช่วยสอน (TA) โครงการ VAIP รุ่น 10–13 กำลังสมัครเรียนต่อ [สาขา/สถาบันที่ต้องการ]",
      cta1: "ดูผลงาน", cta2: "ติดต่อฉัน"
    },
    stats: [
      { n: "4 รุ่น", l: "เป็น TA โครงการ VAIP (รุ่น 10–13)" },
      { n: "2 วิทยากร", l: "ทำงานใกล้ชิดกับ พี่อ้น (AEIOU) และ พี่มิ้น (Realize)" },
      { n: "1 แอป", l: "สร้างเว็บแอปวางแผนแคมเปญด้วยตัวเอง" }
    ],
    about: {
      h: "เกี่ยวกับฉัน",
      p: [
        "ฉันเรียนสาขาการตลาด คณะบริหารธุรกิจ มหาวิทยาลัยศรีปทุม และได้ทำหน้าที่ผู้ช่วยสอน (TA) ให้โครงการ VAIP ต่อเนื่องตั้งแต่รุ่นที่ 10 ถึงรุ่นที่ 13 ทำให้ได้เห็นการทำงานด้านการตลาดและ AI ผ่านวิทยากรที่ทำงานจริง และได้ฝึกการสื่อสารและการทำงานเป็นทีมอย่างสม่ำเสมอ",
        "[เป้าหมายการเรียนต่อ: อยากเรียนสาขา ... ที่ ... เพราะ ... และอยากนำประสบการณ์จากงาน TA ไปต่อยอดอย่างไร]"
      ]
    },
    skills: {
      h: "ทักษะ",
      groups: [
        { t: "การตลาด", items: ["วางแผนแคมเปญ", "Content Marketing", "วิเคราะห์ลูกค้า / Persona", "ความรู้จากงานสัมมนาและ co-work กับผู้ปฏิบัติงานจริง"] },
        { t: "การสอนและการสื่อสาร", items: ["ผู้ช่วยสอน (TA) 4 รุ่น", "ดูแลและประสานงานผู้เรียน", "ทำงานร่วมกับวิทยากรและทีม"] },
        { t: "เครื่องมือ", items: ["AI Tools", "Excel / Google Sheets", "Canva", "HTML / CSS / JavaScript เบื้องต้น"] }
      ]
    },
    projects: {
      h: "ผลงานเด่น",
      items: [
        {
          title: "ผู้ช่วยสอน (TA) โครงการ VAIP รุ่น 10–13",
          role: "TA ร่วมกับ พี่อ้น (AEIOU) และ พี่มิ้น (Realize) · คณะบริหารธุรกิจ ม.ศรีปทุม",
          desc: "[อธิบายหน้าที่จริง เช่น ช่วยสอนอะไร ดูแลผู้เรียนอย่างไร ช่วยประสานงานหรือเตรียมสื่ออะไรบ้าง]",
          result: "สิ่งที่ได้: [เช่น ทักษะการสื่อสาร การใช้ AI ในงาน และการทำงานร่วมกับผู้บริหารตัวจริง / จำนวนผู้เรียนที่ดูแล]",
          tags: ["TA", "AI", "การตลาด", "การสื่อสาร"]
        },
        {
          title: "Marketing Calendar — ระบบวางแผนแคมเปญ",
          role: "ผู้สร้างและออกแบบ · เว็บแอป",
          desc: "เว็บแอปปฏิทินการตลาดที่ใช้วางแผนแคมเปญ แยกตามช่องทาง ติดตามสถานะ และดูภาพรวมผ่านแดชบอร์ด",
          result: "สิ่งที่ได้: [เช่น ใช้วางแผนคอนเทนต์ได้ครบทั้งเดือนในที่เดียว]",
          tags: ["Planning", "Dashboard", "JavaScript"],
          link: "../index.html", linkText: "เปิดใช้งานแอป →"
        },
        {
          title: "[ผลงาน/โปรเจกต์อื่นที่เกี่ยวกับการเรียนต่อ]",
          role: "[บทบาท]",
          desc: "[รายละเอียด เช่น งานวิจัย โปรเจกต์ในวิชา หรือกิจกรรม]",
          result: "สิ่งที่ได้: [...]",
          tags: ["[Tag]"]
        }
      ]
    },
    journey: {
      h: "การศึกษาและประสบการณ์",
      items: [
        { when: "[ปี – ปัจจุบัน]", t: "การตลาด · คณะบริหารธุรกิจ มหาวิทยาลัยศรีปทุม", d: "[ชั้นปี / GPA / กิจกรรม / รางวัล]" },
        { when: "[ปี – ปี]", t: "ผู้ช่วยสอน (TA) โครงการ VAIP รุ่น 10–13", d: "ช่วยดูแลการเรียนรู้ร่วมกับ พี่อ้น (AEIOU) และ พี่มิ้น (Realize) พร้อมเข้าร่วมงานสัมมนาและ co-work ต่อเนื่อง" },
        { when: "[ปี]", t: "[ใบรับรอง / กิจกรรม / รางวัล]", d: "[รายละเอียด]" }
      ]
    },
    contact: {
      h: "ติดต่อ",
      lead: "สนใจพูดคุยหรือต้องการข้อมูลเพิ่มเติม ติดต่อได้ทาง Facebook",
      links: [
        { t: "Facebook", href: "https://www.facebook.com/your-id" }
      ]
    },
    footer: "© 2026 ภัทรกริช สิทธิวงค์ษา · สร้างด้วย HTML/CSS/JS"
  },

  en: {
    brand: "Pattarakit Sitthiwongsa",
    nav: { about: "About", skills: "Skills", projects: "Work", journey: "Journey", contact: "Contact" },
    hero: {
      eyebrow: "Marketing student · Sripatum University",
      title: "Learning marketing by doing,<br>and from people who practice it",
      lead: "Pattarakit Sitthiwongsa, a Marketing student at the Faculty of Business Administration, Sripatum University, and teaching assistant (TA) for VAIP batches 10–13. Applying for further study in [program / institution].",
      cta1: "View work", cta2: "Contact me"
    },
    stats: [
      { n: "4 batches", l: "TA for the VAIP program (batches 10–13)" },
      { n: "2 mentors", l: "Worked closely with P' Aon (AEIOU) and P' Min (Realize)" },
      { n: "1 app", l: "Built a campaign-planning web app" }
    ],
    about: {
      h: "About me",
      p: [
        "I study Marketing at the Faculty of Business Administration, Sripatum University. I have served as a teaching assistant for the VAIP program from batch 10 through batch 13, which let me see marketing and AI through practitioners who work in the field, and gave me steady practice in communication and teamwork.",
        "[Study goal: I want to study ... at ... because ..., and I plan to build on my TA experience by ...]"
      ]
    },
    skills: {
      h: "Skills",
      groups: [
        { t: "Marketing", items: ["Campaign planning", "Content marketing", "Customer analysis / personas", "Seminars and co-work with working professionals"] },
        { t: "Teaching & communication", items: ["Teaching assistant for 4 batches", "Supporting and coordinating learners", "Working with mentors and teams"] },
        { t: "Tools", items: ["AI tools", "Excel / Google Sheets", "Canva", "Basic HTML / CSS / JavaScript"] }
      ]
    },
    projects: {
      h: "Selected work",
      items: [
        {
          title: "Teaching assistant, VAIP batches 10–13",
          role: "TA with P' Aon (AEIOU) and P' Min (Realize) · Faculty of Business Administration, SPU",
          desc: "[Describe your actual duties: what you helped teach, how you supported learners, what you coordinated or prepared.]",
          result: "Outcome: [e.g. communication skills, using AI at work, working with real executives / number of learners supported]",
          tags: ["TA", "AI", "Marketing", "Communication"]
        },
        {
          title: "Marketing Calendar — campaign planner",
          role: "Creator & designer · Web app",
          desc: "A web app for planning campaigns by channel, tracking status, and viewing the big picture on a dashboard.",
          result: "Outcome: [e.g. plans a full month of content in one place]",
          tags: ["Planning", "Dashboard", "JavaScript"],
          link: "../index.html", linkText: "Open the app →"
        },
        {
          title: "[Another project relevant to your application]",
          role: "[Role]",
          desc: "[Details, e.g. research, a course project, or an activity.]",
          result: "Outcome: [...]",
          tags: ["[Tag]"]
        }
      ]
    },
    journey: {
      h: "Education & experience",
      items: [
        { when: "[Year – Present]", t: "Marketing · Faculty of Business Administration, Sripatum University", d: "[Year of study / GPA / activities / awards]" },
        { when: "[Year – Year]", t: "Teaching assistant, VAIP batches 10–13", d: "Supported learning alongside P' Aon (AEIOU) and P' Min (Realize), and kept attending seminars and co-work sessions." },
        { when: "[Year]", t: "[Certificate / activity / award]", d: "[Details]" }
      ]
    },
    contact: {
      h: "Contact",
      lead: "Happy to talk or share more. Reach me on Facebook.",
      links: [
        { t: "Facebook", href: "https://www.facebook.com/your-id" }
      ]
    },
    footer: "© 2026 Pattarakit Sitthiwongsa · Built with HTML/CSS/JS"
  }
};
