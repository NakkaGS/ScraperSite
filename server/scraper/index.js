const request = require('request-promise');
const cheerio = require('cheerio');

const GetSitemapLinks = require("get-sitemap-links").default;

//const URL = 'https://dev98.de/2020/09/14/ajax-loading-of-related-products-in-magento-2/';

(async () => {

    const array = await GetSitemapLinks(
        "https://dev98.de/sitemap-1.xml"
      );

    for (site in array) {
        const response = await request(array[site]);
        let $ = cheerio.load(response);
        $('.sharedaddy').remove();
        $('.saboxplugin-wrap').remove();
        $('.jp-relatedposts').remove();
        
        let title = $('h1[class="entry-title"]').text();
        let writer = $('a[class="url fn n"]').text(); 
        let date = $('time[class="entry-date"]').text(); 
        let comments = $('a[class="comments-link"]').text(); 
        let text = $('div[class="entry-content"]').html();
        let category = $('div[class="cattegories"]').text();

        

        const article = {
          name: title,
          category: category,
          comments: comments,
          text: text,
          writer: writer,
          date: date,
        };

        console.log(" ");
        console.log(array[site])
        console.log(title);
        console.log(writer);
        console.log(category);
        console.log(date);
        console.log(comments);
        console.log(text);
        console.log(category);

        console.log("////////////////////////////////////////////////");
       
    }


    ////////////////////////////////////////////////////////////

/*     const array = await GetSitemapLinks(
        "https://dev98.de/sitemap-1.xml"
      );


    console.log(array) */
    
/*     const response = await request(URL);

    let $ = cheerio.load(response);
    $('.sharedaddy').remove();
    $('.saboxplugin-wrap').remove();
    $('.jp-relatedposts').remove();
    
    
    let title = $('h1[class="entry-title"]').text();
    let name = $('a[class="url fn n"]').text(); 
    let time = $('time[class="entry-date"]').text(); 
    let comments = $('a[class="comments-link"]').text(); 

    let content = $('div[class="entry-content"]').html();
    //saboxplugin-wrap
    //jp-relatedposts
    //sharedaddy 

    //console.log(title);
    //console.log(name);
    //console.log(time);
    //console.log(comments);

    //console.log(content); */


})()
