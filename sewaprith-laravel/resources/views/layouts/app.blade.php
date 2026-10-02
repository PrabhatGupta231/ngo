<!DOCTYPE html>
<html lang="en" class="h-full antialiased">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SewaPrith Foundation - Empowering Slums & Rural Communities</title>
    <meta name="description" content="SewaPrith Foundation is a registered NGO (12A & 80G Tax Exempted) dedicated to medical camp setups, slum child education, and food relief drives in India.">
    <link rel="icon" href="{{ asset('favicon.ico') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <style>
        .glass-nav {
            background-color: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(241, 245, 249, 1);
        }
    </style>
</head>
<body class="min-h-full flex flex-col bg-white text-slate-800 selection:bg-teal-700/20 selection:text-teal-800">
    
    <!-- Top Announcement Bar (If enabled) -->
    @if(isset($content) && optional($content->announcement)['enabled'])
    <div x-data="{ show: true }" x-show="show" class="w-full relative z-50 flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white shadow-md 
        {{ optional($content->announcement)['type'] === 'urgent' ? 'bg-rose-600' : (optional($content->announcement)['type'] === 'success' ? 'bg-emerald-600' : 'bg-blue-600') }}">
        <div class="flex items-center justify-center gap-2 max-w-7xl mx-auto flex-1 pr-8">
            <span>{{ optional($content->announcement)['message'] }}</span>
            @if(optional($content->announcement)['link'])
            <a href="{{ optional($content->announcement)['link'] }}" class="underline font-bold hover:text-white/80 transition-colors whitespace-nowrap">Learn more →</a>
            @endif
        </div>
        <button @click="show = false" class="absolute right-4 hover:bg-black/10 rounded-full p-1 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
    </div>
    @endif

    <!-- Navbar -->
    <header x-data="{ isOpen: false, isScrolled: false }" 
            @scroll.window="isScrolled = (window.pageYOffset > 10) ? true : false"
            :class="isScrolled ? 'glass-nav shadow-sm py-2' : 'bg-white/95 md:bg-transparent py-2 border-b border-transparent'"
            class="sticky top-0 z-40 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between min-h-[88px]">
                
                <!-- Logo -->
                <a href="/" class="flex items-center group ml-14">
                    <div class="h-[105px] w-[180px] overflow-hidden flex items-center justify-center pt-3">
                        <img src="{{ asset('logo.png') }}" alt="SewaPrith Foundation" class="h-[70px] w-auto object-contain scale-[1.25] group-hover:scale-[1.3] transition-transform duration-200 drop-shadow-sm" />
                    </div>
                </a>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center gap-8">
                    @php
                        $navItems = [
                            ['name' => 'Home', 'href' => '/'],
                            ['name' => 'About Us', 'href' => '/about'],
                            ['name' => 'Campaigns', 'href' => '/campaigns'],
                            ['name' => 'Gallery', 'href' => '/gallery'],
                            ['name' => 'Updates', 'href' => '/updates'],
                            ['name' => 'Volunteer', 'href' => '/volunteer'],
                            ['name' => 'Contact', 'href' => '/contact'],
                        ];
                    @endphp
                    @foreach($navItems as $item)
                        <a href="{{ $item['href'] }}" class="text-sm font-semibold transition-colors duration-200 {{ request()->is(ltrim($item['href'], '/')) ? 'text-teal-700 border-b-2 border-teal-700 pb-1' : 'text-slate-700/80 hover:text-teal-700' }}">
                            {{ $item['name'] }}
                        </a>
                    @endforeach
                </nav>

                <!-- CTA & Mobile Toggle -->
                <div class="flex items-center gap-4">
                    <a href="/donate" class="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 duration-200">
                        Donate Now
                    </a>
                    <button @click="isOpen = !isOpen" class="md:hidden p-2 rounded-lg text-slate-700/80 hover:text-teal-700 hover:bg-slate-100 transition-colors focus:outline-none">
                        <svg x-show="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        <svg x-show="isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div x-show="isOpen" class="md:hidden" style="display: none;">
            <div class="fixed inset-0 bg-black opacity-40 z-40" @click="isOpen = false"></div>
            <div class="fixed right-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl p-6 flex flex-col transition-transform transform"
                 x-transition:enter="transition ease-out duration-300"
                 x-transition:enter-start="translate-x-full"
                 x-transition:enter-end="translate-x-0"
                 x-transition:leave="transition ease-in duration-300"
                 x-transition:leave-start="translate-x-0"
                 x-transition:leave-end="translate-x-full">
                
                <div class="flex items-center justify-between mb-8">
                    <a href="/" class="flex items-center">
                        <div class="h-[60px] w-[150px] overflow-hidden flex items-center justify-center">
                            <img src="{{ asset('logo.png') }}" class="h-[100px] w-auto object-contain scale-[1.25]" />
                        </div>
                    </a>
                    <button @click="isOpen = false" class="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div class="flex flex-col gap-4 flex-grow">
                    @foreach($navItems as $item)
                        <a href="{{ $item['href'] }}" class="text-base font-bold py-2 px-3 rounded-lg transition-colors text-slate-700/80 hover:text-teal-700 hover:bg-slate-50">
                            {{ $item['name'] }}
                        </a>
                    @endforeach
                </div>
            </div>
        </div>
    </header>

    <main class="flex-grow">
        @yield('content')
    </main>

    <!-- WhatsApp Button -->
    <div class="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <a href="https://wa.me/918417801736?text=Hello%20SewaPrith%20Foundation!%20I%20would%20like%20to%20know%20more%20about%20your%20campaigns%20and%20how%20I%20can%20contribute." target="_blank" rel="noopener noreferrer" class="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba5a] active:scale-95 duration-200 transition-colors">
            <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            <span class="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none -z-10"></span>
        </a>
    </div>

    <!-- Footer -->
    <footer class="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div class="space-y-4">
                    <a href="/" class="flex items-center">
                        <div class="h-[70px] w-[160px] overflow-hidden flex items-center justify-center">
                            <img src="{{ asset('logoo.png') }}" class="h-[50px] w-auto object-contain scale-[1.25]" />
                        </div>
                    </a>
                    <p class="text-sm text-slate-400">SewaPrith Foundation is a registered non-profit organisation dedicated to healthcare, education, and community upliftment for underserved communities.</p>
                    <div class="pt-1 space-y-1.5">
                        <div class="flex items-center gap-2 text-xs text-slate-300">
                            <svg class="w-3.5 h-3.5 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            <span><span class="font-semibold text-white">Section 8 Non-Profit</span> · MCA, Govt. of India · Licence No: 178498</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-slate-300">
                            <svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            <span><span class="font-semibold text-white">80G Approved</span> · Tax deduction eligible on all donations</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/about" class="hover:text-teal-600 transition-colors">About Our Mission</a></li>
                        <li><a href="/campaigns" class="hover:text-teal-600 transition-colors">Active Projects</a></li>
                        <li><a href="/gallery" class="hover:text-teal-600 transition-colors">Media Gallery</a></li>
                        <li><a href="/updates" class="hover:text-teal-600 transition-colors">News & Blogs</a></li>
                        <li><a href="/volunteer" class="hover:text-teal-600 transition-colors">Become a Volunteer</a></li>
                        <li><a href="/donate" class="hover:text-teal-600 transition-colors">Donate Online</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h3>
                    <ul class="space-y-3 text-sm">
                        <li class="flex items-start gap-2.5">
                            <span class="text-teal-600 shrink-0">📍</span>
                            <span>Plot No 20, Nahar Road, Madiyon, Lucknow, Uttar Pradesh, India - 226021</span>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <span class="text-teal-600 shrink-0">📞</span>
                            <a href="tel:+918417801736" class="hover:text-teal-600 transition-colors">+91 8417801736</a>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <span class="text-teal-600 shrink-0">✉️</span>
                            <a href="mailto:sevaprithfoundation@gmail.com" class="hover:text-teal-600 transition-colors">sevaprithfoundation@gmail.com</a>
                        </li>
                    </ul>
                </div>

                <div x-data="{ email: '', subscribed: false }">
                    <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Subscribe to Updates</h3>
                    <p class="text-sm text-slate-400 mb-4">Get monthly updates on our ground projects, donation drives, and transparency reports.</p>
                    <form @submit.prevent="if(email.trim()) { subscribed = true; email = ''; setTimeout(() => subscribed = false, 3000); }" class="flex gap-2">
                        <input type="email" required placeholder="Your email address" x-model="email" class="w-full bg-slate-900 border border-slate-800 text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-teal-600 text-white placeholder-slate-500" />
                        <button type="submit" class="p-2.5 rounded-lg bg-teal-700 hover:bg-teal-600 text-white transition-colors flex items-center justify-center shadow-lg">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                    </form>
                    <p x-show="subscribed" class="text-xs text-teal-600 font-bold mt-2" style="display: none;">Thank you! You have successfully subscribed.</p>
                </div>
            </div>

            <div class="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                <p>© {{ date('Y') }} SewaPrith Foundation. All Rights Reserved.</p>
                <div class="flex gap-6">
                    <a href="/privacy" class="hover:text-slate-400 transition-colors">Privacy Policy</a>
                    <a href="/terms" class="hover:text-slate-400 transition-colors">Terms of Use</a>
                    <span class="text-slate-600">|</span>
                    <span class="text-slate-400">All donations are tax-exempted under Section 80G of the Income Tax Act.</span>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
