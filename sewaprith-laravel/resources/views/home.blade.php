@extends('layouts.app')

@section('content')
<div class="flex flex-col w-full relative" x-data="{
    mediaFilter: 'all',
    showFloatingPopup: false,
    init() {
        if (!sessionStorage.getItem('popupShown') && {{ optional($content->announcement)['enabled'] ? 'true' : 'false' }}) {
            setTimeout(() => this.showFloatingPopup = true, 3000);
            sessionStorage.setItem('popupShown', 'true');
        }
    }
}">

    <!-- FLOATING NOTIFICATION POPUP -->
    @if(optional($content->announcement)['enabled'])
    <div x-show="showFloatingPopup" style="display: none;"
         x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0 translate-y-10 scale-90"
         x-transition:enter-end="opacity-100 translate-y-0 scale-100"
         x-transition:leave="transition ease-in duration-200"
         x-transition:leave-start="opacity-100 translate-y-0 scale-100"
         x-transition:leave-end="opacity-0 translate-y-10 scale-90"
         class="fixed bottom-6 right-6 z-[60] max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        <div class="h-1.5 w-full {{ optional($content->announcement)['type'] === 'urgent' ? 'bg-rose-500' : (optional($content->announcement)['type'] === 'success' ? 'bg-emerald-500' : 'bg-blue-500') }}"></div>
        <div class="p-5 relative pr-10">
            <button @click="showFloatingPopup = false" class="absolute top-4 right-4 text-slate-400 hover:bg-slate-100 rounded-full p-1 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h4 class="font-extrabold text-slate-900 mb-2">Notice</h4>
            <p class="text-sm text-slate-600 mb-4 leading-relaxed">{{ optional($content->announcement)['message'] }}</p>
            @if(optional($content->announcement)['link'])
            <a href="{{ optional($content->announcement)['link'] }}" @click="showFloatingPopup = false" class="inline-block text-xs font-bold text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                View Details
            </a>
            @endif
        </div>
    </div>
    @endif

    <!-- 1. HERO SECTION -->
    <section class="relative min-h-[90vh] flex items-center bg-slate-950 overflow-hidden py-20">
        <div class="absolute inset-0 z-0">
            <img src="{{ optional($content->hero)['bannerImage'] ?? 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80' }}" alt="SewaPrith Children Education Relief" class="w-full h-full object-cover opacity-35 object-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" x-data="{ mounted: false }" x-init="setTimeout(() => mounted = true, 100)">
            <div class="max-w-3xl space-y-6">
                <div class="inline-flex items-center gap-2 bg-teal-800/20 border border-teal-800/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-teal-300 transition-all duration-500 transform" :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'">
                    <svg class="w-3.5 h-3.5 fill-current text-teal-300 animate-pulse" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    100% Tax-Exempt NGO Under 80G
                </div>

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight transition-all duration-700 delay-150 transform" :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'">
                    @php 
                        $tagline = optional($content->hero)['tagline'] ?? "Small Acts, Big Impact.";
                        $parts = explode(',', $tagline);
                    @endphp
                    {{ $parts[0] }}@if(count($parts) > 1),@endif <span class="text-teal-300">{{ isset($parts[1]) ? implode(',', array_slice($parts, 1)) : "" }}</span> <br />
                    {{ optional($content->hero)['headline'] ?? "Empowering India's Slums." }}
                </h1>

                <p class="text-lg text-slate-300 leading-relaxed max-w-2xl transition-all duration-700 delay-300 transform" :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'">
                    {{ optional($content->hero)['description'] ?? "We run direct diagnostics mobile clinics, sponsor higher education scholarships for slum girls, and serve nutritious food kitchens. 100% of your funds reach the beneficiaries." }}
                </p>

                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 transition-all duration-700 delay-500 transform" :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'">
                    <a href="/donate" class="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/25 hover:scale-105 duration-200">
                        Donate Now
                        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                    <a href="/volunteer" class="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white bg-slate-800 border border-slate-700 hover:bg-slate-900 transition-colors hover:border-slate-600 duration-200">
                        Become a Volunteer
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 2. LIVE IMPACT COUNTER -->
    <section class="relative -mt-16 z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl border border-slate-100 shadow-xl py-8 px-6 md:px-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
                <div class="flex flex-col items-center justify-center text-center lg:first:pl-0 pt-6 sm:pt-0">
                    <span class="text-3xl md:text-4xl font-extrabold text-teal-700 flex items-center">
                        {{ optional($content->impact_stats)['livesImpacted'] ?? '15200' }}+
                    </span>
                    <span class="text-sm font-semibold text-slate-500 mt-2">Lives Impacted Directly</span>
                </div>

                <div class="flex flex-col items-center justify-center text-center pt-6 sm:pt-0 lg:pl-6">
                    <span class="text-3xl md:text-4xl font-extrabold text-teal-700 flex items-center">
                        {{ optional($content->impact_stats)['activeDrives'] ?? '50' }}+
                    </span>
                    <span class="text-sm font-semibold text-slate-500 mt-2">Active Ground Drives</span>
                </div>

                <div class="flex flex-col items-center justify-center text-center pt-6 sm:pt-0 lg:pl-6">
                    <span class="text-3xl md:text-4xl font-extrabold text-teal-700 flex items-center">
                        {{ optional($content->impact_stats)['transparency'] ?? '100' }}%
                    </span>
                    <span class="text-sm font-semibold text-slate-500 mt-2">Financial Transparency</span>
                </div>

                <div class="flex flex-col items-center justify-center text-center pt-6 sm:pt-0 lg:pl-6">
                    <span class="text-3xl md:text-4xl font-extrabold text-teal-700 flex items-center">
                        ₹{{ optional($content->impact_stats)['fundsDeployed'] ?? '45' }}L+
                    </span>
                    <span class="text-sm font-semibold text-slate-500 mt-2">Funds Deployed on Ground</span>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. ACTIVE CAMPAIGNS -->
    <section class="py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div class="max-w-xl">
                    <h2 class="text-xs font-bold text-teal-700 uppercase tracking-widest">Help Today</h2>
                    <p class="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">Active Fundraising Campaigns</p>
                    <p class="text-sm text-slate-500 mt-2">Sponsor healthcare equipment, digital notebooks, and meals. Track real-time progress on each cause.</p>
                </div>
                <a href="/campaigns" class="inline-flex items-center text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors gap-1.5 mt-4 md:mt-0">
                    View All Projects
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @foreach($campaigns as $campaign)
                @php 
                    $percent = min(round(($campaign->raised_amount / max(1, $campaign->goal_amount)) * 100), 100);
                @endphp
                <div class="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full group">
                    <div class="relative aspect-video overflow-hidden bg-slate-100 shrink-0">
                        <img src="{{ $campaign->image }}" alt="{{ $campaign->title }}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span class="absolute top-3 left-3 bg-slate-900/80 text-[10px] font-bold text-white uppercase px-2.5 py-1 rounded-full backdrop-blur-sm">
                            {{ $campaign->category }}
                        </span>
                    </div>

                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-base font-extrabold text-slate-900 tracking-tight line-clamp-2 min-h-[48px] group-hover:text-teal-700 transition-colors">
                            {{ $campaign->title }}
                        </h3>
                        <p class="text-sm text-slate-500 mt-2 line-clamp-3 flex-grow">
                            {{ $campaign->excerpt }}
                        </p>

                        <div class="mt-6 space-y-2">
                            <div class="flex justify-between items-end text-xs">
                                <div>
                                    <span class="text-slate-400">Raised:</span> 
                                    <span class="font-extrabold text-slate-900">₹{{ number_format($campaign->raised_amount) }}</span>
                                </div>
                                <span class="font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-[10px]">
                                    {{ $percent }}%
                                </span>
                            </div>
                            
                            <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div class="h-full bg-teal-600 rounded-full transition-all duration-500" style="width: {{ $percent }}%"></div>
                            </div>

                            <div class="flex justify-between text-xs text-slate-400">
                                <span>Goal: ₹{{ number_format($campaign->goal_amount) }}</span>
                                <span>{{ $campaign->days_left }} days left</span>
                            </div>
                        </div>

                        <div class="pt-6 mt-6 border-t border-slate-50">
                            <a href="/campaigns?id={{ $campaign->id }}" class="w-full inline-flex items-center justify-center py-2.5 rounded-xl text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors">
                                Support This Cause
                            </a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- 4. WHY SUPPORT US: TRUST PILLARS -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-16 space-y-3">
                <h2 class="text-xs font-bold text-teal-700 uppercase tracking-widest">Why SewaPrith?</h2>
                <p class="text-3xl font-extrabold text-slate-900 tracking-tight">Our Trust & Transparency Pillars</p>
                <p class="text-sm text-slate-500 max-w-xl mx-auto">We are committed to building long-term local trust by proving every single transaction has a direct ground impact.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @foreach(optional($content->trust_pillars) ?? [] as $pillar)
                <div class="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center space-y-4 hover:shadow-md transition-shadow">
                    <div class="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center text-teal-700 mx-auto">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900">{{ $pillar['title'] ?? '' }}</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">{{ $pillar['description'] ?? '' }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- 8. DUAL CALL TO ACTION BANNER -->
    <section class="py-24 bg-gradient-to-br from-teal-700 to-teal-800 text-white text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_40%)]"></div>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to make a difference in someone's life?</h2>
            <p class="text-slate-200 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Whether you choose to sponsor a child's digital lab class or volunteer your weekends to teach, your action matters. Join the SewaPrith movement today.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a href="/donate" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-bold text-teal-700 bg-white hover:bg-slate-50 transition-colors shadow-lg hover:scale-105 duration-200">
                    Donate Online
                </a>
                <a href="/volunteer" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-bold text-white border border-white/30 hover:bg-white/10 transition-colors hover:scale-105 duration-200">
                    Volunteer Form
                </a>
            </div>
        </div>
    </section>

</div>
@endsection
