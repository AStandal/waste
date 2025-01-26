import { load } from 'cheerio';
import { mkdir } from 'node:fs/promises';

export interface Proposition {
    title: string;
    date: string;
    department: string;
    url?: string;
}

export async function scrapePropositions(): Promise<Proposition[]> {
    try {
        const response = await fetch('https://www.regjeringen.no/no/dokument/id2000006/?documenttype=dokumenter/proposisjoner&isfilteropen=True&term=');
        const html = await response.text();
        const $ = load(html);
        const propositions: Proposition[] = [];

        // Write scraped HTML to file for debugging
        await mkdir('./scraped', { recursive: true });
        await Bun.write("./scraped/scraped.html", html);
        console.log("Wrote scraped HTML to ./scraped/scraped.html");

        // Each proposition is in a div with class 'results'
        $('.results').find('li').each((_, element) => {
            const title = $(element).find('h2 ').text().trim();
            const date = $(element).find('.info .date').text().trim();
            const department = $(element).find('.info .department').text().trim();
            const url = $(element).find('h2 a').attr('href');
            
            if (title && date && department && url) {
                propositions.push({
                    title,
                    date,
                    department,
                    url: url ? `https://www.regjeringen.no${url}` : undefined
                });
            }
        });

        await Bun.write("./scraped/propositions.json", JSON.stringify(propositions, null, 2));

        return propositions;
    } catch (error) {
        console.error('Error scraping propositions:', error);
        return [{
            title: 'Error',
            date: 'Error',
            department: 'Error',
            url: 'Error'
        }];
    }
}