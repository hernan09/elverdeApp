import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const NewsComponent = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNews = async () => {
        try {
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            
            // Debug info para desarrollo
            if (process.env.NODE_ENV === 'development') {
                console.log('Environment:', process.env.NODE_ENV);
                console.log('API Key exists:', !!apiKey);
            }
            
            if (!apiKey) {
                setError('Se requiere una API key de NewsAPI. Por favor configura REACT_APP_NEWS_API_KEY en tu archivo .env o en las variables de entorno de Vercel');
                setLoading(false);
                return;
            }

            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=5&apiKey=${apiKey}`
            );
            
            // Solo mostramos la respuesta en desarrollo
            if (process.env.NODE_ENV === 'development') {
                console.log('API Response:', response.data);
            }

            if (response.data.articles && response.data.articles.length > 0) {
                setNews(response.data.articles);
                setError(null);
            } else {
                setError(`No se encontraron noticias. Status: ${response.data.status}, Total Results: ${response.data.totalResults}`);
            }
        } catch (err) {
            // Debug info más detallada en desarrollo
            if (process.env.NODE_ENV === 'development') {
                console.log('Error completo:', err);
            }
            
            if (err.response?.status === 401) {
                setError(`Error de autenticación: La API key no es válida o ha expirado. 
                         Por favor verifica tu API key en https://newsapi.org y asegúrate de que esté correctamente configurada en Vercel.`);
            } else if (err.response?.status === 429) {
                setError('Se ha excedido el límite de peticiones. Por favor intenta más tarde.');
            } else if (err.response?.data) {
                setError(`Error al cargar las noticias: ${err.response.data.message || 'Error desconocido'}`);
            } else {
                setError('Error al cargar las noticias. Por favor intenta más tarde.');
            }
            console.error('Error fetching news:', err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
        // Actualizamos cada 30 segundos en lugar de 10 para evitar límites de la API
        const interval = setInterval(fetchNews, 30000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="news-container">
                <div className="news-loading">Cargando noticias...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="news-container">
                <div className="news-error">
                    <h3>Error al cargar las noticias</h3>
                    <p>{error}</p>
                    <div className="news-error-help">
                        <p>Para configurar el componente de noticias:</p>
                        <ol>
                            <li>Regístrate en <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">NewsAPI.org</a></li>
                            <li>Obtén tu API key gratuita</li>
                            <li>Crea un archivo .env en la raíz del proyecto</li>
                            <li>Agrega la línea: REACT_APP_NEWS_API_KEY=tu_api_key</li>
                            <li>Asegúrate que tu cuenta esté verificada en NewsAPI.org</li>
                            <li>Reinicia la aplicación</li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

    if (news.length === 0) {
        return (
            <div className="news-container">
                <div className="news-empty">
                    <h3>No hay noticias disponibles</h3>
                    <p>Por favor, intenta más tarde o verifica tu configuración de NewsAPI.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="news-container">
            <h2 className="news-header">Últimas Noticias</h2>
            <div className="news-list">
                {news.map((article, index) => (
                    <div key={index} className="news-item">
                        <h3 className="news-title">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                {article.title}
                            </a>
                        </h3>
                        <p className="news-description">{article.description}</p>
                        <div className="news-meta">
                            <span className="news-source">{article.source.name}</span>
                            <span className="news-date">
                                {new Date(article.publishedAt).toLocaleDateString('es-AR')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsComponent; 