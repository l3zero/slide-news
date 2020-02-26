import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import '../styles/footer.css'

export default function Footer() {
    return (
        <footer>
            <div id="about-row">
                <a className="footer-link">About</a>
                <a href="https://github.com/kRyM1337/slide-news" target="_blank" rel="noopener noreferer">Github</a>
                <a className="footer-link">Contact</a>
            </div>

            <div id="ending-row">
                Powered by <div>Insert icons here</div>
            </div>
            <div id="version-row">Version 1.0</div>
        </footer>

    )
}