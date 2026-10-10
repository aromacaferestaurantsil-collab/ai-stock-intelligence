"use client";
import { useMemo, useState } from "react";
const rows = [
 {symbol:"RELIANCE",name:"Reliance Industries",market:"IN",category:"Energy",price:"₹1,462.50",change:"+1.24%",fundamental:78,technical:69},
 {symbol:"TCS",name:"Tata Consultancy Services",market:"IN",category:"Technology",price:"₹3,218.00",change:"−0.42%",fundamental:84,technical:57},
 {symbol:"HDFCBANK",name:"HDFC Bank",market:"IN",category:"Banking",price:"₹968.25",change:"+0.68%",fundamental:81,technical:72},
 {symbol:"AAPL",name:"Apple Inc.",market:"US",category:"Technology",price:"$245.10",change:"+0.31%",fundamental:86,technical:75},
 {symbol:"FCX",name:"Freeport-McMoRan",market:"US",category:"Metals",price:"$42.30",change:"+2.18%",fundamental:66,technical:82},
 {symbol:"XOM",name:"Exxon Mobil",market:"US",category:"Energy",price:"$116.70",change:"−0.15%",fundamental:77,technical:61}
];
export default function Home() {
 const [market,setMarket]=useState("ALL"); const [category,setCategory]=useState("All");
 const filtered=useMemo(()=>rows.filter(r=>(market==="ALL"||r.market===market)&&(category==="All"||r.category===category)),[market,category]);
 return <main className="shell"><header className="top"><div><span className="eyebrow">RESEARCH WORKSPACE</span><h1>AI Stock Intelligence</h1><p>Fundamentals and technical signals, kept separate.</p></div><span className="demo">DEMO DATA</span></header>
 <section className="notice">Demo interface only. Prices and scores are illustrative—not live market data or investment advice.</section>
 <section className="stats"><article><span>Markets</span><strong>India + US</strong><small>Separate exchange calendars</small></article><article><span>Scoring model</span><strong>0–100</strong><small>Fundamental and technical</small></article><article><span>Data coverage</span><strong>Demo</strong><small>Provider not connected</small></article></section>
 <section className="panel"><div className="panelhead"><div><h2>Market screener</h2><p>Filter by market and sector</p></div><div className="filters"><select aria-label="Market" value={market} onChange={e=>setMarket(e.target.value)}><option value="ALL">All markets</option><option value="IN">India</option><option value="US">United States</option></select><select aria-label="Category" value={category} onChange={e=>setCategory(e.target.value)}><option>All</option>{["Metals","Energy","Technology","Banking"].map(c=><option key={c}>{c}</option>)}</select></div></div>
 <div className="tablewrap"><table><thead><tr><th>Instrument</th><th>Market</th><th>Indicative price</th><th>Change</th><th>Fundamental</th><th>Technical</th></tr></thead><tbody>{filtered.map(r=><tr key={r.symbol}><td><strong>{r.symbol}</strong><small>{r.name}</small></td><td>{r.market}</td><td>{r.price}</td><td className={r.change.startsWith("+")?"positive":"negative"}>{r.change}</td><td><b className="score">{r.fundamental}</b><div className="bar"><i style={{width:r.fundamental+"%"}}/></div></td><td><b className="score">{r.technical}</b><div className="bar"><i style={{width:r.technical+"%"}}/></div></td></tr>)}</tbody></table>{filtered.length===0&&<p className="empty">No instruments match those filters.</p>}</div></section>
 <footer>Built as an MVP foundation · No brokerage or trading integration · Validate all data sources and scoring rules before release.</footer></main>;
}
