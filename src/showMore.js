import { PageList } from "./PageList";
export { showMore };

const showMore = () => {
    console.log("On est dans showMore");
    const showmoreButton = document.getElementById('showmore-button');
    showmoreButton.style.display = 'block';
    
    let clickCount = 0;
    
    showmoreButton.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 1) { PageList('', 18); };
        if (clickCount === 2) {
            PageList('', 27);
            showmoreButton.style.display = 'none';
            clickCount = 0;
        };
    });
}