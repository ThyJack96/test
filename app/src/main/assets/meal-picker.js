// MASSFORGE selectable preset meal system
// Keeps the day-by-day plan as the default, but lets the user swap any meal
// for a large preset library. The selected preset is saved to that date.

window.MASSFORGE_MEAL_PICKER_VERSION='1.2';

const MF_MEAL_FACTORS={1:1,2:1.10,3:1.23,4:.96,5:1.08};
const MF_MEAL_LIBRARY={
  Breakfast:[
    {id:'protein_oatmeal',food:'Protein oatmeal + 1 egg + banana',cal:500,protein:40},
    {id:'whey_oats',food:'Oatmeal + whey protein + berries',cal:440,protein:38},
    {id:'overnight_oats',food:'Protein overnight oats + Greek yogurt + berries',cal:470,protein:40},
    {id:'eggs_oatmeal',food:'3 eggs + egg whites + oatmeal + berries',cal:520,protein:48},
    {id:'egg_whites_toast',food:'Eggs + egg whites + whole-grain toast + fruit',cal:480,protein:42},
    {id:'egg_scramble',food:'Egg scramble + toast + fruit',cal:480,protein:40},
    {id:'breakfast_burrito',food:'Breakfast burrito with eggs + turkey sausage',cal:560,protein:48},
    {id:'breakfast_bowl',food:'Egg + turkey sausage breakfast bowl + potatoes',cal:520,protein:43},
    {id:'protein_pancakes',food:'Protein pancakes + eggs + berries',cal:520,protein:42},
    {id:'yogurt_breakfast',food:'Greek yogurt protein bowl + banana + berries',cal:450,protein:40},
    {id:'cottage_breakfast',food:'Cottage cheese + fruit + toast + 2 eggs',cal:490,protein:41},
    {id:'protein_cereal',food:'High-protein cereal + 1% milk + banana',cal:430,protein:32},
    {id:'breakfast_sandwich',food:'Egg + turkey sausage breakfast sandwich + fruit',cal:500,protein:38},
    {id:'shake_oatmeal',food:'Protein shake + oatmeal + fruit',cal:460,protein:42},
    {id:'shake_toast',food:'Protein shake + peanut butter toast + banana',cal:520,protein:40}
  ],
  Snack:[
    {id:'yogurt_banana',food:'Greek yogurt + banana',cal:260,protein:25},
    {id:'yogurt_berries',food:'Greek yogurt + berries',cal:220,protein:24},
    {id:'yogurt_granola',food:'Greek yogurt + small granola serving',cal:280,protein:25},
    {id:'cottage_fruit',food:'Cottage cheese + fruit',cal:250,protein:27},
    {id:'cottage_berries',food:'Cottage cheese + berries',cal:240,protein:26},
    {id:'shake_water',food:'Protein shake with water',cal:190,protein:30},
    {id:'shake_milk',food:'Protein shake + 1% milk',cal:300,protein:38},
    {id:'shake_fruit',food:'Protein shake + fruit',cal:250,protein:30},
    {id:'shake_almonds',food:'Protein shake + almonds',cal:300,protein:32},
    {id:'protein_bar_fruit',food:'Protein bar + fruit',cal:280,protein:25},
    {id:'turkey_rollups',food:'Turkey roll-ups + light cheese',cal:240,protein:30},
    {id:'eggs_fruit',food:'2 hard-boiled eggs + fruit',cal:230,protein:14}
  ],
  Lunch:[
    {id:'chicken_rice',food:'7 oz chicken + rice + vegetables',cal:650,protein:58},
    {id:'chicken_rice_light',food:'Grilled chicken + smaller rice portion + vegetables',cal:520,protein:52},
    {id:'turkey_rice_bowl',food:'Turkey rice bowl + beans + salsa',cal:640,protein:55},
    {id:'chicken_burrito_bowl',food:'Chicken burrito bowl + beans + salsa',cal:690,protein:58},
    {id:'steak_bowl',food:'Steak rice bowl + beans + vegetables',cal:650,protein:52},
    {id:'chicken_wrap',food:'Chicken wrap + Greek yogurt',cal:560,protein:52},
    {id:'turkey_wrap',food:'Turkey wrap + fruit + Greek yogurt',cal:540,protein:46},
    {id:'chicken_pasta',food:'Chicken pasta + vegetables',cal:650,protein:58},
    {id:'chicken_sandwich',food:'Grilled chicken sandwich + potato wedges',cal:620,protein:52},
    {id:'turkey_sandwich',food:'Turkey sandwich + Greek yogurt + fruit',cal:560,protein:46},
    {id:'tuna_wrap',food:'Tuna wrap + fruit',cal:520,protein:44},
    {id:'salmon_rice',food:'Salmon + rice + vegetables',cal:640,protein:45},
    {id:'lean_beef_bowl',food:'Lean beef + rice + vegetables',cal:650,protein:52},
    {id:'chicken_salad',food:'Large grilled chicken salad + light dressing + fruit',cal:500,protein:50},
    {id:'taco_steak_bowl',food:'Steak power-style bowl with rice + beans + vegetables',cal:520,protein:32}
  ],
  'Snack 2':[
    {id:'shake_apple',food:'Protein shake + apple',cal:240,protein:30},
    {id:'shake_fruit_2',food:'Protein shake + fruit',cal:250,protein:30},
    {id:'shake_water_2',food:'Protein shake with water',cal:190,protein:30},
    {id:'shake_milk_2',food:'Protein shake + 1% milk',cal:300,protein:38},
    {id:'yogurt_bar',food:'Greek yogurt + protein bar',cal:330,protein:35},
    {id:'yogurt_berries_2',food:'Greek yogurt + berries',cal:220,protein:24},
    {id:'cottage_berries_2',food:'Cottage cheese + berries',cal:240,protein:26},
    {id:'shake_ricecakes',food:'Protein shake + rice cakes',cal:260,protein:30},
    {id:'shake_pb_toast',food:'Protein shake + peanut butter toast',cal:360,protein:35},
    {id:'shake_banana',food:'Protein shake + banana',cal:260,protein:30},
    {id:'turkey_rollups_2',food:'Turkey roll-ups + light cheese',cal:240,protein:30},
    {id:'protein_pudding',food:'Greek yogurt protein pudding',cal:240,protein:30}
  ],
  Dinner:[
    {id:'lean_beef_potatoes',food:'Lean beef + potatoes + vegetables',cal:650,protein:50},
    {id:'chicken_rice_dinner',food:'Chicken + rice + vegetables',cal:620,protein:55},
    {id:'chicken_potatoes',food:'Grilled chicken + potatoes + vegetables',cal:600,protein:55},
    {id:'salmon_potatoes',food:'Salmon + potatoes + broccoli',cal:680,protein:48},
    {id:'salmon_rice_dinner',food:'Salmon + rice + vegetables',cal:660,protein:46},
    {id:'lean_steak',food:'Lean steak + sweet potato + greens',cal:700,protein:55},
    {id:'steak_rice_dinner',food:'Lean steak + rice + vegetables',cal:690,protein:55},
    {id:'lean_beef_pasta',food:'Lean beef pasta + salad',cal:680,protein:52},
    {id:'chicken_pasta_dinner',food:'Chicken pasta + salad',cal:650,protein:55},
    {id:'turkey_burgers',food:'Turkey burgers + potatoes + vegetables',cal:650,protein:50},
    {id:'lean_beef_taco',food:'Lean beef taco bowl',cal:700,protein:55},
    {id:'chicken_taco',food:'Chicken taco bowl + beans + salsa',cal:650,protein:55},
    {id:'turkey_meatballs',food:'Turkey meatballs + pasta + vegetables',cal:660,protein:52},
    {id:'pork_tenderloin',food:'Pork tenderloin + potatoes + vegetables',cal:620,protein:52},
    {id:'shrimp_rice',food:'Shrimp + rice + vegetables',cal:600,protein:48},
    {id:'chicken_fajitas',food:'Chicken fajitas + tortillas + vegetables',cal:650,protein:52}
  ]
};

function mfAdjustMeal(item,phase){
  if(item.id==='skip')return {...item};
  const f=MF_MEAL_FACTORS[phase]||1;
  let food=item.food;
  if(phase===3)food+=' · larger carb portion';
  if(phase===4)food+=' · controlled portion';
  return {...item,food,cal:Math.round((Number(item.cal)||0)*f/10)*10,protein:(Number(item.protein)||0)+((phase===3||phase===4)?2:0)};
}

function mfMealOptions(slotIndex){
  const phase=currentPhase();
  const defaults=mealsFor(phase,selectedDate.getDay());
  const suggested=defaults[slotIndex];
  const slot=suggested?.name||['Breakfast','Snack','Lunch','Snack 2','Dinner'][slotIndex]||'Meal';
  const library=MF_MEAL_LIBRARY[slot]||[];
  const options=[
    {id:'default',food:`Today's suggestion — ${suggested?.food||'Meal'}`,cal:suggested?.cal||0,protein:suggested?.protein||0,rawFood:`★ Today's suggestion — ${suggested?.food||'Meal'}`},
    {id:'skip',food:'Skip preset / log it manually below',cal:0,protein:0,rawFood:'Manual / restaurant meal — log below'}
  ];
  library.forEach(x=>{const a=mfAdjustMeal(x,phase);options.push({...a,rawFood:x.food})});
  return {slot,options};
}

function mfSelectedMeals(){
  const r=currentRecord();
  const selections=r.mealSelections||{};
  return [0,1,2,3,4].map(i=>{
    const {slot,options}=mfMealOptions(i);
    const wanted=selections[i]||'default';
    const selected=options.find(x=>x.id===wanted)||options[0];
    return {name:slot,...selected};
  });
}

renderMeals=function(){
  const meals=mfSelectedMeals(),r=currentRecord(),done=r.mealsComplete||[];
  document.getElementById('mealTitle').textContent=`${selectedDate.toLocaleDateString(undefined,{weekday:'long'})} Meal Plan`;
  const list=document.getElementById('mealList');list.innerHTML='';
  meals.forEach((m,i)=>{
    const {options}=mfMealOptions(i),selectedId=(r.mealSelections||{})[i]||'default';
    const d=document.createElement('div');d.className='meal mf-meal-picker';
    d.innerHTML=`<h3>${esc(m.name)}</h3><div class="mf-help">Tap below to swap this meal — ${options.length-2} presets available</div><label class="mf-picker-label">Meal choice<select class="mf-meal-select" data-meal-select="${i}">${options.map(o=>`<option value="${esc(o.id)}" ${o.id===selectedId?'selected':''}>${esc(o.rawFood||o.food)}</option>`).join('')}</select></label><div class="mf-selected-food">${esc(m.food)}</div><div class="macro">${m.cal} cal · ${m.protein}g protein</div><label><input class="meal-check" data-meal="${i}" type="checkbox" ${done[i]?'checked':''}>Ate this meal</label>`;
    list.appendChild(d);
  });
  list.querySelectorAll('[data-meal-select]').forEach(sel=>{sel.onchange=()=>{const r=ensureRecord();if(!r.mealSelections)r.mealSelections={};r.mealSelections[Number(sel.dataset.mealSelect)]=sel.value;saveState();renderMeals()}});
  document.getElementById('plannedCalories').textContent=`${meals.reduce((a,m)=>a+Number(m.cal||0),0)} cal planned`;
  document.getElementById('plannedProtein').textContent=`${meals.reduce((a,m)=>a+Number(m.protein||0),0)}g protein`;
  document.getElementById('mealCount').textContent=`${done.filter(Boolean).length}/${meals.length} meals`;
  updateNutrition();
};

calcNutrition=function(){
  const meals=mfSelectedMeals(),checks=[...document.querySelectorAll('[data-meal]')];let cal=0,protein=0;
  checks.forEach((c,i)=>{if(c.checked&&meals[i]){cal+=Number(meals[i].cal||0);protein+=Number(meals[i].protein||0)}});
  foodItems().forEach(f=>{cal+=Number(f.cal||0);protein+=Number(f.protein||0)});
  return {cal,protein};
};

(function(){
  const s=document.createElement('style');
  s.textContent=`.mf-help{font-size:.82rem;color:#35d07f;margin:2px 0 8px}.mf-picker-label{display:block;margin:8px 0 10px;font-size:.82rem;color:#9fb1c5}.mf-meal-select{width:100%;margin-top:6px;min-height:50px;border-radius:10px;border:1px solid #3c5872;background:#0d1722;color:#eef6ff;padding:10px 12px;font-size:.95rem}.mf-selected-food{font-weight:700;margin:8px 0 6px;line-height:1.35}.mf-meal-picker .macro{margin-bottom:10px}`;
  document.head.appendChild(s);
})();

renderMeals();
