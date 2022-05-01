jQuery('.card-slider').slick({
    slidesToShow:3,
    autoplay: true,
    slidesToScroll:1,
    dots: false,
    responsive:[
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  
  const cardData = {
    "card_1": {
      "text": "Love heath ledger (TQ). Good but not good to watch too frequently (SS)."
    },
    "card_2": {
      "text": "Almost perfect. Ending left way too many loose ends, seemed like they expected another season. Plot line with borders wasn't the best."
    },
    "card_3": {
      "text": "Started off strong but tapered off (SS). Bored in the beginning but the mystery was intriguing (TQ)."
    },
    "card_4": {
      "text": "Near perfect. Ending was confusing in terms of original 101 Dalmations plot: how will cruella end up making dog fur coats if she loves them?"
    },
    "card_5": {
      "text": "Intriguing. Laid down a good foundation for a series: Harry becoming incorporated into a new world"
    },
    "card_6": {
      "text": "Nostalgic (SS). Meh (TQ)."
    },
    "card_7": {
      "text": "Confusing. A little boring for ppl who didnt read the book maybe."
    },
    "card_8": {
      "text": "A lot of variety i.e. action, drama, etc. P.S. Rob we know your secret "
    },
    "card_9": {
        "text": "It was okay."
    },
    "card_10": {
        "text": "Good how the movie was visually dark, reflecting the dark plot. Good visual effects. "
    },
    "card_11": {
        "text": "Good lead up for the next movie. Left with enough questions for the next movie but not confusing."
    },
    "card_12": {
        "text": "Drama, action, redemption: tied up loose ends. No burning questions."
    },
    "card_13": {
        "text": "Good but not great."
    },
    "card_14": {
        "text": "Great but initially confusing. Leaves you thinking. "
    },
    "card_15": {
        "text": "Nostalgic (TQ). Great casting. Biblical references could be more subtle."
    },
    "card_16": {
        "text": "Good visuals i.e. castle, forest (TQ). Too much (SS). Great casting. Biblical references could be more subtle."
    },
    "card_17": {
        "text": "Best friend sucked: very annoying and selfish. Grandma’s outfits were not age appropriate."
    },
    "card_18": {
        "text": "A lot of cliches. Pretty castle. Barely any diversity, if there is, they’re stereotypes or background actors. "
    },
    "card_19": {
        "text": "Horror and comedies don’t mix very well. Plot kept us engaged: not entirely predictable."
    },
    "card_20": {
        "text": "Good visuals i.e. forest/foggy. Cringey, a lot of fantasy cliches. Twilight should take Harry Potter 1 as an example in keeping the audience engaged. Edward was so rude and unaffectionate until he revealed to Bella he liked her, out of nowhere. "
    },
    "card_21": {
        "text": "Hated how Jacob seemed like he felt entitled to her. More interesting than the first twilight."
    },
    "card_22": {
        "text": "Cliches but not as predictable. Jacob vs. Edward: excellent Drama."
    },
    "card_23": {
        "text": "Peak cringe and unsettling. Pretty wedding tho. "
    },
    "card_24": {
        "text": "Insanely creepy baby. Jacob being in love with the baby was so unhinged and terrible. Makeup should have been better. Good action sequence at the end: not predictable."
    },
  }
  
  let cards = document.querySelectorAll('.card');
  let card;
  let modal = document.querySelector('.modal');
  let closeButton = document.querySelector('.modal__close-button');
  let page = document.querySelector('.page');
  const cardBorderRadius = 20;
  const openingDuration = 600; //ms
  const closingDuration = 600; //ms
  const timingFunction = 'cubic-bezier(.76,.01,.65,1.38)';
  
  var Scrollbar = window.Scrollbar;
  Scrollbar.init(document.querySelector('.modal__scroll-area'));
  
  
  function flipAnimation(first, last, options) {
    let firstRect = first.getBoundingClientRect();
    let lastRect = last.getBoundingClientRect();
  
    let deltas = {
      top: firstRect.top - lastRect.top,
      left: firstRect.left - lastRect.left,
      width: firstRect.width / lastRect.width,
      height: firstRect.height / lastRect.height
    };
  
    return last.animate([{
      transformOrigin: 'top left',
      borderRadius:`
      ${cardBorderRadius/deltas.width}px / ${cardBorderRadius/deltas.height}px`,
      transform: `
        translate(${deltas.left}px, ${deltas.top}px)
        scale(${deltas.width}, ${deltas.height})
      `
    },{
      transformOrigin: 'top left',
      transform: 'none',
      borderRadius: `${cardBorderRadius}px`
    }],options);
  }
  
  cards.forEach((item)=>{
    item.addEventListener('click',(e)=>{
      jQuery('.card-slider').slick('slickPause');
      card = e.currentTarget;
      cardName = card.classList[1];
      console.log(cardName);
      page.dataset.modalState = 'opening';
      card.classList.add('card--opened');
      card.style.opacity = 0;
      document.querySelector('body').classList.add('no-scroll');
      const details = document.getElementById("modal-details");
      details.innerHTML = cardData[cardName].text;
  
      let animation = flipAnimation(card,modal,{
        duration: openingDuration,
        easing: timingFunction,
        fill:'both'
      });
  
      animation.onfinish = ()=>{
        page.dataset.modalState = 'open';
        animation.cancel();
      };
    });
  });
  
  closeButton.addEventListener('click',(e)=>{
    page.dataset.modalState = 'closing';
    document.querySelector('body').classList.remove('no-scroll');
  
    let animation = flipAnimation(card,modal,{
      duration: closingDuration,
      easing: timingFunction,
      direction: 'reverse',
      fill:'both'
    });
  
    animation.onfinish = ()=>{
      page.dataset.modalState = 'closed';
      card.style.opacity = 1;
      card.classList.remove('card--opened');
      jQuery('.card-slider').slick('slickPlay');
      animation.cancel();
    };
  });