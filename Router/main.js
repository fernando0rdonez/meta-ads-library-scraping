const express = require('express');
const router = express.Router();
const pupperteer = require('puppeteer');
const excelJS = require("exceljs");

router.get("/", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.render("index", { titulo: "Titulo de inicio" });
});

router.get("/procesing", async (req, res) => {
    try {
        const body = req.query;

        // const browser = await pupperteer.launch();
        const browser = await pupperteer.launch({ headless: false });
        const webs = [
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=436006600190532&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=298509077211798&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=311892089000594&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=229699630374794&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=538749149832329&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=102288291247266&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=1348323205248063&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=189250454970675&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=2100034740239980&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all', //Higiene Intima Femenina
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=1959582224306256&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=153253464686486&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=369976579712562&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=1607967756093208&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',// Papel higiénico
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=858800680967128&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=103353068637181&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=130368257027116&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=182736465817558&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=644149625627684&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=905280472817425&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',// Pañales Infantiles
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=338354880012966&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=476181519105181&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
            'https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=EC&view_all_page_id=436300423488600&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&search_type=page&media_type=all',
        ];
        var allResult = [];
        if (body.urls != '') {
            const page = await browser.newPage();
            await page.setViewport({
                width: 1200,
                height: 800
            });
            await page.goto(body.urls);
            await page.waitForSelector('._9cb_');
            await autoScroll(page);
            await page.screenshot({ path: 'screen.jpg', fullPage: true })
            const elementos = await page.evaluate(() => {
                const elemento = document.querySelectorAll('._99s5');
                const objetos = [];
                elemento.forEach((element, key, arr) => {
                    var item = {};
                    var content = element.querySelectorAll('.m8urbbhe');
                    var date = content[1].querySelector('span').innerText
                    var marca = element.querySelector('.dgpf1xc5');
                    var strMarca = marca.querySelector('span').innerText; //Encontrar marca

                    var content_str = element.querySelectorAll('._4ik4');
                    var descripcion = '';
                    try {
                        descripcion = content_str[1].textContent;
                    } catch (error) {
                        descripcion = "Post no disponible porque no se puede comprobar la edad";
                    }


                    content = element.querySelectorAll('._7jys'); // obtreniendo imagenes
                    var urlsArray = [];
                    content.forEach(elmt => {
                        urlsArray.push(elmt.src);
                    });

                    //Encontrar videos
                    try {
                        const videos = element.querySelector('video').src; // obtreniendo imagenes
                        urlsArray.push(videos);
                    } catch (error) {

                    }

                    /// Encontrar platadormas 
                    var conten_plataform = element.querySelectorAll('.jwy3ehce'); // obtreniendo imagenes
                    var plataformas = [];
                    conten_plataform.forEach(pfm => {
                        var mask_value = pfm.style.webkitMaskPosition;
                        switch (mask_value) {
                            case '-108px -230px':
                                plataformas.push('Facebook');
                                break;
                            case '-19px -673px':
                                plataformas.push('Instagram');
                                break;
                            case '-17px -66px':
                                plataformas.push('Facebook Network');
                                break;
                            case '-17px -79px':
                                plataformas.push('Messenger');
                                break;
                            default:
                                // plataformas.push(JSON.stringify(mask_value));
                                break;
                        }
                    });

                    // clase q tiene todos los elementos de plataforma
                    item.marca = strMarca;
                    item.fecha = date;
                    item.plataformas = plataformas;
                    item.url = urlsArray;
                    item.texto = descripcion;
                    objetos.push(item);
                });
                return objetos;
            });
            allResult = elementos;
        } else {
            for (const page_item of webs) {

                const page = await browser.newPage();
                await page.setViewport({
                    width: 1200,
                    height: 800
                });
                // await page.goto(body.urls);
                await page.goto(page_item);
                try {
                    await page.waitForSelector('._9cb_', { timeout: 5000 });
                } catch (error) {
                    page.close();
                    continue;
                }
                await autoScroll(page);
                await page.screenshot({ path: 'screen.jpg', fullPage: true })
                const result_x_page = await page.evaluate(() => {
                    const result_x_element = [];
                    const elemento = document.querySelectorAll('._99s5');

                    elemento.forEach((element, key, arr) => {
                        var item = {};
                        var content = element.querySelectorAll('.m8urbbhe');
                        var date = content[1].querySelector('span').innerText
                        var marca = element.querySelector('.dgpf1xc5');
                        var strMarca = marca.querySelector('span').innerText; //Encontrar marca

                        var content_str = element.querySelectorAll('._4ik4');
                        var descripcion = '';
                        try {
                            descripcion = content_str[1].textContent;
                        } catch (error) {
                            descripcion = "Post no disponible porque no se puede comprobar la edad";
                        }


                        content = element.querySelectorAll('._7jys'); // obtreniendo imagenes
                        var urlsArray = [];
                        content.forEach(elmt => {
                            urlsArray.push(elmt.src);
                        });

                        //Encontrar videos
                        try {
                            const videos = element.querySelector('video').src; // obtreniendo imagenes
                            urlsArray.push(videos);
                        } catch (error) {

                        }

                        /// Encontrar platadormas 
                        var conten_plataform = element.querySelectorAll('.jwy3ehce'); // obtreniendo imagenes
                        var plataformas = [];
                        conten_plataform.forEach(pfm => {
                            var mask_value = pfm.style.webkitMaskPosition;
                            switch (mask_value) {
                                case '-108px -230px':
                                    plataformas.push('Facebook');
                                    break;
                                case '-19px -673px':
                                    plataformas.push('Instagram');
                                    break;
                                case '-17px -66px':
                                    plataformas.push('Audience Network');
                                    break;
                                case '-17px -79px':
                                    plataformas.push('Messenger');
                                    break;
                                default:
                                    // plataformas.push(JSON.stringify(mask_value));
                                    break;
                            }
                        });

                        // clase q tiene todos los elementos de plataforma
                        item.marca = strMarca;
                        item.fecha = date;
                        item.plataformas = plataformas;
                        item.url = urlsArray;
                        item.texto = descripcion;
                        result_x_element.push(item);
                    });
                    return result_x_element;
                });

                allResult = [...allResult, ...result_x_page];
                page.close();
            };
        }

        await browser.close();
        res.set('Access-Control-Allow-Origin', '*');
        res.render("result", { data: allResult });

    } catch (error) {
        console.log(error);
        res.set('Access-Control-Allow-Origin', '*');
        res.send(error);
    }
})

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        });
    });
}

module.exports = router;