<div align="center">
  <img src="assets/SAVIALOGO%20SIN%20FONDO.png" alt="Savia Nutrición Clínica" width="180"/>
  <br><br>
  <h1>Savia Nutrición Clínica</h1>
  <p><strong>Dra. Valeria Rojas</strong></p>
  <p><em>Salud y bienestar real, sin dietas milagro.</em></p>
  <br>
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  </p>
  <p>
    <img src="https://img.shields.io/badge/Formspree-000000?style=for-the-badge&logo=formspree&logoColor=white" alt="Formspree">
    <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome">
    <img src="https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white" alt="Google Fonts">
  </p>
</div>

---

## 📋 Descripción

Landing page profesional para **Savia Nutrición Clínica**, la consulta de la **Dra. Valeria Rojas** en Barranquilla, Colombia. El sitio presenta un enfoque médico, empático y basado en evidencia científica para el acompañamiento nutricional.

---

## 🎨 Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| Verde principal | `#00AF54` | Marca, botones, acentos |
| Azul secundario | `#058ED9` | Detalles secundarios |
| Amarillo acento | `#EFCA08` | Badges, elementos destacados |
| Fondo claro | `#EBF2FA` | Secciones alternas |
| Casi negro | `#080F0F` | Texto principal, footer |

---

## 🧩 Estructura del Sitio

```
├── index.html              # Página principal (single page)
├── style.css               # Estilos completos con variables CSS
├── script.js               # Lógica del formulario + navegación
├── assets/
│   ├── SAVIALOGO SIN FONDO.png
│   └── DOCTORA.jpeg
└── README.md
```

### Secciones

1. **Hero** — Mensaje principal con CTA a agendar cita
2. **Empatía** — Cards que conectan con las necesidades del paciente
3. **Servicios** — Control de Patologías, Recomposición Corporal, Educación Nutricional
4. **Testimonios** — Historias de pacientes reales
5. **Contacto** — Formulario integrado con Formspree + datos de contacto

---

## ✨ Características

- **Diseño responsive** — Adaptado a desktop, tablet y móvil
- **Navegación smooth scroll** — Transiciones suaves entre secciones
- **Indicador de nav animado** — Sublínea deslizante en la barra de navegación
- **Formulario funcional** — Envío de consultas vía Formspree con feedback visual
- **Tipografía moderna** — Outfit para headings, Inter para cuerpo
- **Iconos Font Awesome** — Librería gratuita de iconos vectoriales

---

## 📬 Formulario de Contacto

El formulario envía los datos a **Formspree** y está configurado con los siguientes campos:

| Campo | Tipo | Requerido |
|-------|------|-----------|
| Nombre | `text` | Sí |
| Correo | `email` | Sí |
| Servicio | `select` | Sí |
| Mensaje | `textarea` | Sí |

El endpoint de Formspree está configurado en `script.js`:

```js
fetch('https://formspree.io/f/mqejgnez', { method: 'POST', body: formData })
```

---

## 🚀 Despliegue

Al ser un sitio 100% estático, se puede desplegar en cualquier servicio de hosting estático:

```bash
# Usando cualquier servidor local
npx serve .
```

O directamente abriendo `index.html` en el navegador.

---

## 📄 Licencia

Todos los derechos reservados &copy; 2024 Savia Nutrición Clínica — Dra. Valeria Rojas.
