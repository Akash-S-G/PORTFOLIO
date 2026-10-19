import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def generate_resume(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    header_name = ParagraphStyle(
        'HeaderName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#111827'),
        alignment=TA_CENTER
    )
    
    header_subtitle = ParagraphStyle(
        'HeaderSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#374151'),
        alignment=TA_CENTER
    )
    
    section_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#0F172A'),
        textTransform='uppercase',
        spaceAfter=3
    )

    job_title = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#1E293B')
    )

    job_meta = ParagraphStyle(
        'JobMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#475569'),
        alignment=TA_RIGHT
    )

    body = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#334155')
    )

    bullet = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#334155'),
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )

    story = []

    # Header
    story.append(Paragraph("<b>AKASH SIDDAPPA GOUNDI</b>", header_name))
    story.append(Spacer(1, 4))
    
    contact_text = (
        "Bengaluru, Karnataka, India &nbsp;|&nbsp; "
        "<b>Email:</b> akashgoundi100@gmail.com &nbsp;|&nbsp; "
        "<b>Phone:</b> +91 9900832414 &nbsp;|&nbsp; "
        "<a href='https://github.com/Akash-S-G' color='#0284C7'>GitHub</a> &nbsp;|&nbsp; "
        "<a href='https://linkedin.com/in/akash-goundi-27320b303' color='#0284C7'>LinkedIn</a>"
    )
    story.append(Paragraph(contact_text, header_subtitle))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=8))

    # Education
    story.append(Paragraph("Education", section_title))
    edu_data = [
        [
            Paragraph("<b>R V College of Engineering</b> — B.E. in Information Science and Engineering", job_title),
            Paragraph("<b>2023 – 2027</b> | CGPA: <b>8.37</b>", job_meta)
        ],
        [
            Paragraph("<b>Konnur Science PU College</b> — Pre-University Course (PCMCs)", job_title),
            Paragraph("<b>2022 – 2023</b> | Percentage: <b>95.16%</b>", job_meta)
        ]
    ]
    edu_table = Table(edu_data, colWidths=[400, 140])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#E2E8F0'), spaceAfter=8))

    # Professional Experience
    story.append(Paragraph("Experience", section_title))
    exp_header = [
        [
            Paragraph("<b>STON Technology</b> — Software Development Engineer Intern", job_title),
            Paragraph("Bengaluru, India | June 2026 – Sept 2026", job_meta)
        ]
    ]
    exp_table = Table(exp_header, colWidths=[380, 160])
    exp_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(exp_table)
    story.append(Spacer(1, 3))
    story.append(Paragraph("• Engineered an admit-card and attendance verification system utilizing QR-code scanning with automated Excel reporting pipelines.", bullet))
    story.append(Paragraph("• Implemented real-time gate check-in workflows, camera-based QR scanning, and walk-in candidate registration with MongoDB attendance persistence.", bullet))
    story.append(Paragraph("• Built secure student onboarding via CSV whitelisting, join-code account claiming, Google OAuth, Role-Based Access Control (RBAC), and TOTP two-factor authentication.", bullet))
    story.append(Paragraph("• Developed per-drive attendance analytics, officer verification attribution, automated formatting, and edge-case notification alerts for operational integrity.", bullet))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#E2E8F0'), spaceAfter=8))

    # Projects
    story.append(Paragraph("Featured Projects", section_title))
    
    # Project 1: PIHUB
    proj1 = [
        [
            Paragraph("<b>PIHUB — Offline AI Tutor & Edge Distribution Platform</b> (Flagship)", job_title),
            Paragraph("<a href='https://github.com/Akash-S-G/pihub' color='#0284C7'>github.com/Akash-S-G/pihub</a>", job_meta)
        ]
    ]
    t1 = Table(proj1, colWidths=[380, 160])
    t1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t1)
    story.append(Paragraph("<i>Technologies: Python, FastAPI, llama.cpp, GGUF Models, Qdrant, Docker, Raspberry Pi</i>", body))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Built an offline-first learning platform enabling local AI tutoring, content pack distribution, and edge computing across classrooms.", bullet))
    story.append(Paragraph("• Architected FastAPI services running llama.cpp for quantized GGUF model execution, memory caching, and low-latency token streaming.", bullet))
    story.append(Paragraph("• Engineered a decentralized synchronization engine supporting 405+ curriculum content pack manifests, chunk offset resuming, and UDP beacon intranet discovery.", bullet))
    story.append(Spacer(1, 6))

    # Project 2: Smart Cart
    proj2 = [
        [
            Paragraph("<b>AI-Based Smart Shopping Cart System</b>", job_title),
            Paragraph("<a href='https://github.com/Akash-S-G/SMART-CART' color='#0284C7'>github.com/Akash-S-G/SMART-CART</a>", job_meta)
        ]
    ]
    t2 = Table(proj2, colWidths=[380, 160])
    t2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t2)
    story.append(Paragraph("<i>Technologies: FastAPI, Python, YOLO11n, PostgreSQL, WebSockets, Modal Cloud</i>", body))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Created an automated checkout ecosystem integrating real-time visual product recognition with backend shopping cart and inventory state.", bullet))
    story.append(Paragraph("• Built vision detection endpoint using YOLO11n with cloud inference fallback, broadcasting instant item updates to carts via WebSockets.", bullet))
    story.append(Paragraph("• Implemented product catalog search, barcode generation, inventory decrement guards, coupon validation, and automated PDF billing.", bullet))
    story.append(Spacer(1, 6))

    # Project 3: Sol-Bridge
    proj3 = [
        [
            Paragraph("<b>Sol-Bridge — Community Solar Energy Sharing Platform</b>", job_title),
            Paragraph("<a href='https://github.com/Akash-S-G/Sol-Bridge' color='#0284C7'>github.com/Akash-S-G/Sol-Bridge</a>", job_meta)
        ]
    ]
    t3 = Table(proj3, colWidths=[380, 160])
    t3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t3)
    story.append(Paragraph("<i>Technologies: Node.js, Express.js, PostgreSQL, TimescaleDB, Redis, MQTT</i>", body))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Developed backend microservices architecture for IoT smart-meter telemetry ingestion and community peer-to-peer energy sharing.", bullet))
    story.append(Paragraph("• Designed high-throughput time-series storage with TimescaleDB for continuous meter sensor metrics and Redis Pub/Sub for internal events.", bullet))
    story.append(Paragraph("• Structured user management, quota allocation workflows, and smart energy transaction verification boundaries.", bullet))
    story.append(Spacer(1, 6))

    # Project 4: FundShield
    proj4 = [
        [
            Paragraph("<b>FundShield — AI-Powered Welfare Verification Microservice</b>", job_title),
            Paragraph("<a href='https://github.com/Akash-S-G/FUNDSHIELD-ML' color='#0284C7'>github.com/Akash-S-G/FUNDSHIELD-ML</a>", job_meta)
        ]
    ]
    t4 = Table(proj4, colWidths=[380, 160])
    t4.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t4)
    story.append(Paragraph("<i>Technologies: Python, FastAPI, OpenCV, YOLOv8, Scikit-learn, Docker</i>", body))
    story.append(Spacer(1, 2))
    story.append(Paragraph("• Architected Dockerized ML verification service for construction proof validation and financial transaction anomaly detection.", bullet))
    story.append(Paragraph("• Implemented perceptual hashing (ImageHash) for duplicate detection, ExifRead for metadata verification, and YOLOv8 for stage classification.", bullet))
    story.append(Paragraph("• Deployed Scikit-learn Isolation Forest algorithm to surface objective anomaly risk scores without false conclusive fraud claims.", bullet))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#E2E8F0'), spaceAfter=8))

    # Technical Skills
    story.append(Paragraph("Technical Skills", section_title))
    skills_text = (
        "<b>Languages:</b> Python, C++, C, JavaScript, TypeScript<br/>"
        "<b>Backend Engineering:</b> FastAPI, Flask, Express.js, REST APIs, WebSockets, Socket.IO<br/>"
        "<b>AI & Applied ML:</b> LLM Integration, Local Inference (llama.cpp, GGUF), Computer Vision (OpenCV, YOLO), Scikit-learn<br/>"
        "<b>Databases & Caching:</b> PostgreSQL, TimescaleDB, MongoDB, SQLite, Redis<br/>"
        "<b>Systems & DevOps:</b> Linux, Raspberry Pi, Docker, Git, GitHub<br/>"
        "<b>CS Fundamentals:</b> Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, System Design"
    )
    story.append(Paragraph(skills_text, body))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#E2E8F0'), spaceAfter=8))

    # Achievements
    story.append(Paragraph("Achievements & Problem Solving", section_title))
    story.append(Paragraph("• <b>DSA Problem Solving:</b> Solved <b>300+</b> data structures and algorithms problems across LeetCode and Codeforces.", bullet))
    story.append(Paragraph("• <b>Competitions:</b> Winner of the Technical Quiz Challenge at Nagarjuna College.", bullet))

    doc.build(story)
    print(f"Resume generated successfully at {output_path}")

if __name__ == '__main__':
    generate_resume('/home/akash/Desktop/PORTFOLIO/public/Akash-Siddappa-Goundi-Resume.pdf')
