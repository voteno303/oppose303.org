/**
 * Name: Google Doc Loading Script
 * Author: Drew Hornbein
 *
 * This script replaces a html element with the HTML content of a *published* Google Document
 * Checkout the README to learn how to setup your Google Doc
 * Add id="doc" to the element you wish to replace
 * Add a data variable data-gdoc-url=""" to the element with the Google Doc PUBLISHED URL
 * this script will extract the ID
 *
 * Example:
 * <div id="doc" data-gdoc-url="https://docs.google.com/document/d/e/2PACX-1vT5gCxJy7b1abHTQ0AKOFCYbssHDy1pVQyjJmBvsRrwA1T7GiULwaENsv2k_Mfwj8xYdBEiQzvJtD8N/pub">Loading...</div>
 */

/**
 * Request - loads google doc
 * @param {string} url the publish URL of a Google Doc
 */
function request(url, style) {
    // build iframe to load as a backup
    const iframe = '<iframe src="' + url + '?embedded=false"></iframe>';

    // CORS request
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        // create html node
        let html = document.createElement('html');
        // add response to node
        html.innerHTML = xhr.responseText;
        // grab only the contents from the returned Google Doc html
        d.innerHTML = html.getElementsByTagName('div')["contents"].innerHTML;
        if ( ! style ){
            // removes the 1st element (should be the <style> tag)
            d.removeChild(d.getElementsByTagName("STYLE")[0])
        }
        // add a class to loading div
        d.classList.add("gdoc--import");

        // FF displays last downloaded favicon regardless of whether it's added to the DOM.
        // This is a hacky fix that adds another favicon DOM element to replace the Google Doc favicon
        var link =  document.createElement('link');
        link.type = 'image/x-icon'; link.rel = 'shortcut icon'; link.href = '/assets/favicon/favicon-32x32.png';
        document.getElementsByTagName('head')[0].appendChild(link);
    };
    xhr.onerror = function () {
        // add class to body
        document.body.classList.add("iframe");
        // insert iframe into element
        d.innerHTML = iframe;
        d.classList.add("gdoc--iframe");
    }
    xhr.send();
}
