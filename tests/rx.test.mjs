import test from 'node:test';
import assert from 'node:assert/strict';
import {plan,REG,bsa,calvert,doseText} from '../rx.js';
const base={hist:'adeno',setting:'metastatic',marker:'none',egfrType:'ex19',pdl:'mid',ps:'good',phase:'initial',priorLine:'chemoio',priorEgfr:'g12',t790m:false,priorAlk:'g2',ctfi:'short'};
const pt={height:170,weight:65,crcl:90,brain:'none'};
const ids=r=>r.options.map(o=>o.id);
const first=r=>r.options[0];

test('dose math',()=>{assert.equal(bsa(170,65).toFixed(2),'1.75');assert.equal(calvert(5,90),575);assert.equal(calvert(5,200),750);assert.equal(doseText({wt:[80,'a','b']},{weight:80}).calc,'b');assert.equal(doseText({mgm2:500},{}).calc,'')});
test('every regimen has drugs, cycle, trial and NHI text',()=>{for(const [id,r] of Object.entries(REG)){assert.ok(r.drugs.length,id);assert.ok(r.cycle&&r.trial,id);const n=r.nhi(base,pt);assert.ok(['yes','cond','fail','no'].includes(n.k),id);assert.ok(n.t.length>4,id)}});
test('sweep: no crash, every option resolves',()=>{
 for(const hist of ['adeno','squamous','sclc'])for(const setting of ['early','resect','unresect','metastatic','limited','extensive'])for(const phase of ['initial','postcrt','progressed'])for(const marker of ['unknown','none','egfr','exon20','alk','ros1','braf','met','ret','ntrk','kras','her2'])for(const pdl of ['unknown','high','mid','low'])for(const ps of ['good','two','poor'])for(const p of [pt,{},{weight:90,height:180,crcl:40,brain:'symptomatic',ioContra:true,cisContra:true}]){
  const r=plan({...base,hist,setting,phase,marker,pdl,ps},p);
  for(const o of r.options){assert.ok(o.reg&&o.drugs.every(d=>d.std),o.id);}
 }
});
test('urgent and incomplete stop before prescribing',()=>{assert.ok(plan({...base,emergency:true},pt).stop);assert.ok(plan({...base,ps:''},pt).stop);assert.ok(plan({...base,marker:'unknown'},pt).stop)});
test('EGFR first line: osimertinib first and NHI covered',()=>{const r=plan({...base,marker:'egfr'},pt);assert.equal(first(r).id,'osi');assert.equal(first(r).nhi.k,'yes');assert.equal(r.options.find(o=>o.id==='osichemo').nhi.k,'no')});
test('erlotinib+bev only offered for L858R with brain mets',()=>{assert.ok(!ids(plan({...base,marker:'egfr'},pt)).includes('erlbev'));const r=plan({...base,marker:'egfr',egfrType:'l858r'},{...pt,brain:'asymptomatic'});assert.equal(r.options.find(o=>o.id==='erlbev').nhi.k,'yes')});
test('T790M after 1st/2nd gen → osimertinib NHI yes; after osimertinib → chemo',()=>{const r=plan({...base,marker:'egfr',phase:'progressed',priorLine:'tki',t790m:true},pt);assert.equal(first(r).id,'osi');assert.equal(first(r).nhi.k,'yes');assert.equal(first(plan({...base,marker:'egfr',phase:'progressed',priorLine:'tki',priorEgfr:'g3'},pt)).id,'platpem')});
test('ALK sequencing follows NHI',()=>{const a=plan({...base,marker:'alk',phase:'progressed',priorLine:'tki',priorAlk:'crizo'},pt);assert.equal(first(a).id,'brig');assert.equal(first(a).nhi.k,'yes');const b=plan({...base,marker:'alk',phase:'progressed',priorLine:'tki',priorAlk:'g2'},pt);assert.equal(first(b).id,'lorla');assert.equal(first(b).nhi.k,'yes')});
test('ROS1 repotrectinib: progression NHI yes, first line no',()=>{assert.equal(plan({...base,marker:'ros1'},pt).options.find(o=>o.id==='repo').nhi.k,'no');assert.equal(first(plan({...base,marker:'ros1',phase:'progressed',priorLine:'tki'},pt)).nhi.k,'yes')});
test('no driver non-squamous PD-L1 mid → KEYNOTE-189 first, NHI yes',()=>{const r=plan(base,pt);assert.equal(first(r).id,'kn189');assert.equal(first(r).nhi.k,'yes')});
test('PD-L1 high → pembrolizumab mono first',()=>assert.equal(first(plan({...base,pdl:'high'},pt)).id,'pembro'));
test('squamous TPS<1% → tislelizumab combo first; pembro combo NHI fail',()=>{const r=plan({...base,hist:'squamous',pdl:'low'},pt);assert.equal(first(r).id,'tissq');assert.equal(r.options.find(o=>o.id==='kn407').nhi.k,'fail')});
test('squamous never offered bevacizumab or pemetrexed first line',()=>{const r=plan({...base,hist:'squamous'},pt);assert.ok(!ids(r).some(i=>['abcp','kn189','platpem','tisnsq'].includes(i)))});
test('IO NHI fails when CrCl ≤60 or liver abnormal',()=>{assert.equal(first(plan(base,{...pt,crcl:55})).nhi.k,'fail');assert.equal(first(plan(base,{...pt,liver:true})).nhi.k,'fail')});
test('CrCl <60 swaps cisplatin for carboplatin',()=>{const o=plan({...base,marker:'egfr'},{...pt,crcl:50}).options.find(o=>o.id==='osichemo');assert.ok(o.drugs.some(d=>d.n==='Carboplatin'&&d.note));assert.ok(!o.drugs.some(d=>d.n==='Cisplatin'))});
test('CrCl <45 marks pemetrexed regimens not recommended and sorts them last',()=>{const r=plan(base,{...pt,crcl:40});assert.ok(r.options.find(o=>o.id==='kn189').avoid);assert.ok(!first(r).avoid)});
test('autoimmune contraindication demotes all IO',()=>{const r=plan(base,{...pt,ioContra:true});assert.ok(r.options.filter(o=>o.reg.io).every(o=>o.avoid));assert.ok(!first(r).reg.io)});
test('ES-SCLC: IO NHI fails with brain mets',()=>{const s={...base,hist:'sclc',setting:'extensive'};assert.equal(first(plan(s,pt)).nhi.k,'yes');assert.equal(first(plan(s,{...pt,brain:'asymptomatic'})).nhi.k,'fail')});
test('LS-SCLC after CRT → durvalumab ADRIATIC, NHI not listed',()=>{const o=first(plan({...base,hist:'sclc',setting:'limited',phase:'postcrt'},pt));assert.equal(o.id,'adriatic');assert.equal(o.nhi.k,'no')});
test('relapsed SCLC by chemo-free interval',()=>{assert.equal(first(plan({...base,hist:'sclc',setting:'extensive',phase:'progressed',ctfi:'long'},pt)).id,'rechal');assert.equal(first(plan({...base,hist:'sclc',setting:'extensive',phase:'progressed'},pt)).id,'tarla')});
test('stage III post-CRT: durvalumab NHI depends on PD-L1; EGFR gets osimertinib',()=>{const s={...base,setting:'unresect',phase:'postcrt'};assert.equal(first(plan(s,pt)).nhi.k,'yes');assert.equal(first(plan({...s,pdl:'low'},pt)).nhi.k,'fail');assert.equal(first(plan({...s,marker:'egfr'},pt)).id,'osicons')});
test('resectable: EGFR → adjuvant osimertinib; ALK → alectinib; none → neoadjuvant nivolumab',()=>{const s={...base,setting:'resect'};assert.ok(ids(plan({...s,marker:'egfr'},pt)).includes('adjosi'));assert.equal(first(plan({...s,marker:'alk'},pt)).id,'adjalec');assert.equal(first(plan(s,pt)).id,'neonivo')});
test('early stage: local therapy only',()=>{const r=plan({...base,setting:'early'},pt);assert.equal(r.options.length,0);assert.match(r.note,/SBRT/)});
test('ECOG 3–4 without driver → supportive care; with driver → TKI kept',()=>{assert.equal(plan({...base,ps:'poor'},pt).options.length,0);assert.equal(first(plan({...base,ps:'poor',marker:'alk'},pt)).id,'alec')});
test('weight-band doses',()=>{const o=plan({...base,marker:'ret'},{...pt,weight:45}).options.find(o=>o.id==='selper');assert.equal(o.drugs[0].calc,'120 mg')});
test('goal reflects curative vs control',()=>{assert.equal(plan({...base,setting:'resect'},pt).goal[0],'根治');assert.equal(plan(base,pt).goal[0],'延長存活與控制疾病')});
