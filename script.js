'use strict';
// รายละเอียดสูตรเป็นตัวอย่างประกอบ สามารถแก้ไขให้ตรงสูตรจริงได้
const recipes = [
 {name:'THANG NOODLE',thai:'ก๋วยเตี๋ยวน้ำ',image:'noodle',time:'20 นาที',servings:'4 ที่',ingredients:['เส้นก๋วยเตี๋ยว 400 กรัม','น้ำซุป 1.5 ลิตร','เนื้อสัตว์หรือเต้าหู้ 300 กรัม','ผักและเครื่องปรุงตามชอบ'],method:'ต้มน้ำซุปให้เดือด ใส่เนื้อสัตว์หรือเต้าหู้จนสุก ลวกเส้นและผักแยกไว้ จัดลงชาม เติมน้ำซุปและปรุงรสตามชอบ'},
 {name:'MANGO STICKY RICE',thai:'ข้าวเหนียวมะม่วง',image:'mango',time:'35 นาที',servings:'4 ที่',ingredients:['ข้าวเหนียวแช่น้ำแล้ว 250 กรัม','กะทิ 250 มิลลิลิตร','น้ำตาล 80 กรัม และเกลือเล็กน้อย','มะม่วงสุก 2 ลูก'],method:'นึ่งข้าวเหนียวจนสุก อุ่นกะทิกับน้ำตาลและเกลือให้ละลาย ผสมกับข้าวเหนียวร้อนแล้วพักให้ดูดซึม จัดเสิร์ฟกับมะม่วงสุกหั่นชิ้น'},
 {name:'CORN SPICY SALAD',thai:'ตำข้าวโพด',image:'salad',time:'15 นาที',servings:'2 ที่',ingredients:['ข้าวโพดต้ม 2 ฝัก','มะเขือเทศและถั่วฝักยาว','พริก กระเทียม น้ำมะนาว','น้ำปลาและน้ำตาลตามชอบ'],method:'ฝานข้าวโพดเตรียมไว้ ตำพริกและกระเทียมเบา ๆ ผสมน้ำมะนาว น้ำปลาและน้ำตาล ใส่ผักกับข้าวโพด คลุกให้เข้ากัน ชิมแล้วปรับรสตามชอบ'}
];
const track=document.querySelector('#track');
const carousel=document.querySelector('.carousel');
const modal=document.querySelector('#recipe-dialog');
for(let i=0;i<12;i++){
 const recipe=recipes[i%recipes.length];
 const card=document.createElement('button');
 card.className='card';card.type='button';card.setAttribute('aria-label','ดูสูตร '+recipe.thai);
 const img=document.createElement('img');img.src='assets/'+recipe.image+'.png';img.alt=recipe.name;img.draggable=false;
 card.append(img);card.addEventListener('click',()=>openRecipe(recipe));track.append(card);
}
function openRecipe(recipe){
 document.querySelector('#recipe-title').textContent=recipe.thai;
 document.querySelector('#recipe-meta').textContent=recipe.time+' · '+recipe.servings+' · สูตรตัวอย่าง';
 document.querySelector('#ingredients').replaceChildren(...recipe.ingredients.map(item=>{const li=document.createElement('li');li.textContent=item;return li;}));
 document.querySelector('#method').textContent=recipe.method;
 modal.showModal();
}
modal.querySelector('.close').addEventListener('click',()=>modal.close());
modal.querySelector('.done').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{if(event.target===modal){const rect=modal.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)modal.close();}});
const motion=matchMedia('(prefers-reduced-motion: reduce)');
function step(direction){const card=track.firstElementChild;const distance=card.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap);const max=carousel.scrollWidth-carousel.clientWidth;const target=carousel.scrollLeft+direction*distance;carousel.scrollTo({left:target>max-2?0:target<0?max:target,behavior:motion.matches?'instant':'smooth'});}
document.querySelector('#previous').addEventListener('click',()=>step(-1));
document.querySelector('#next').addEventListener('click',()=>step(1));
let paused=motion.matches;let interacting=false;
const pause=document.querySelector('#pause');
function updatePause(){pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'เปิดการเลื่อนอัตโนมัติ':'หยุดเลื่อนอัตโนมัติ');}
updatePause();pause.addEventListener('click',()=>{paused=!paused;updatePause();});
motion.addEventListener('change',()=>{paused=motion.matches;updatePause();});
carousel.addEventListener('pointerenter',()=>interacting=true);carousel.addEventListener('pointerleave',()=>interacting=false);
carousel.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();step(event.key==='ArrowRight'?1:-1);}});
setInterval(()=>{if(!paused&&!interacting&&!document.hidden&&!modal.open&&!carousel.contains(document.activeElement))step(1);},3500);
