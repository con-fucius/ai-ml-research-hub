export async function GET() {
    const baseUrl = (import.meta.env.BASE_URL || '').replace(/\/$/, '');

    // 1. Gather all content
    const frameworkFiles = import.meta.glob('../../_data/frameworks/*.yml', { eager: true });
    const vectorDBFiles = import.meta.glob('../../_data/vector_databases/*.yml', { eager: true });
    const protocolFiles = import.meta.glob('../../_data/protocols/*.yml', { eager: true });

    const docs = [];

    // Helper to process items
    const processItems = (files, type, urlPrefix) => {
        Object.values(files).forEach((mod) => {
            const item = mod.default;
            if (!item || item.hidden) return;
            docs.push({
                title: item.name,
                description: item.summary,
                content: JSON.stringify(item), // Index full content
                type: type,
                url: `${urlPrefix}/${item.id}`,
            });
        });
    };

    processItems(frameworkFiles, 'Framework', `${baseUrl}/frameworks`);
    processItems(vectorDBFiles, 'Vector DB', `${baseUrl}/vector_databases`);
    processItems(protocolFiles, 'Protocol', `${baseUrl}/protocols`);

    // Add Models (from providers.yml if structured differently)
    const providersData = await import.meta.glob('../../_data/providers.yml', { eager: true });
    if (Object.values(providersData)[0]) {
        const providers = Object.values(providersData)[0].default;
        providers.forEach(p => {
            docs.push({
                title: p.name,
                description: `Models by ${p.name}`,
                content: JSON.stringify(p.models || []),
                type: 'Model Provider',
                url: `${baseUrl}/models/${p.id}`
            });
        })
    }

    return new Response(JSON.stringify(docs), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
