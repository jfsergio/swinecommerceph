{{--
    Displays details of a chosen product
--}}

@extends('user.customer.home')

@section('title')
    | {{$product->name}}
@endsection

@section('pageId')
    id="page-customer-view-product-details"
@endsection

@section('breadcrumbTitle')
    {{$product->name}}
@endsection

@section('breadcrumb')
    <a href="{{ route('home_path') }}" class="breadcrumb">Home</a>
    <a href="{{ route('products.view') }}" class="breadcrumb">Products</a>
    <a href="#!" class="breadcrumb">{{$product->name}}</a>
@endsection

@section('content')
    <div class="row">
        <div class="col s12 m7">
            {{-- Primary Image --}}
            <div class="row">
                <div class="card">
                    <div class="card-image">
                        <img src="{{$product->img_path}}" data-imagezoom="true">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                <ul class="tabs">
                    <li id="image-carousel-tab" class="tab col s3"><a class="active" href="#images-carousel">Images</a></li>
                    <li id="video-carousel-tab" class="tab col s3"><a href="#videos-carousel">Videos</a></li>
                </ul>
                </div>
                {{-- Image Carousel --}}
                <div id="images-carousel" class="col s12">
                    <div class="carousel" style="height:220px;">
                        <a class="carousel-item" href="#!"><img src="{{$product->img_path}}"></a>
                        @foreach($product->imageCollection as $image)
                            <a class="carousel-item" href="#!"><img src="/images/product/{{$image->name}}"></a>
                        @endforeach
                    </div>
                </div>
                {{--  Video Carousel --}}
                <div id="videos-carousel" class="col s12">
                    <div class="carousel" style="height:220px;">
                        @foreach($product->videoCollection as $video)
                            <a class="carousel-item" href="#!">
                                <video class="responsive-video" controls>
                                    <source src="/videos/product/{{$video->name}}" type="{{$video->type}}">
                                </video>
                            </a>
                        @endforeach
                    </div>
                </div>
            </div>

        </div>
        {{-- Product Details --}}
        <div class="col s12 m5">
            <ul class="collection with-header">
                <li class="collection-header">
                    <h4 class="row">
                        <div class="col">
                            {{ $product->name }}
                        </div>
                        <div class="col right">
                            {!! Form::open(['route' => 'cart.add', 'data-product-id' => $product->id, 'data-type' => $product->type]) !!}
                                <a href="#" class="right tooltipped add-to-cart"  data-position="left" data-delay="50" data-tooltip="Add to Swine Cart">
                                    <i class="material-icons red-text" style="font-size:35px;">add_shopping_cart</i>
                                </a>
                            {!! Form::close() !!}
                        </div>
                    </h4>
                    <div class="row">
                        <div class="col">
                            {{ $product->breeder }} <br>
                            {{ $product->farm_province }}
                        </div>
                    </div>
                </li>
                <li class="collection-item">{{$product->type}} - {{$product->breed}}</li>
                <li class="collection-item">{{$product->age}} days old</li>
                <li class="collection-item">Average Daily Gain: {{$product->adg}} g</li>
                <li class="collection-item">Feed Conversion Ratio: {{$product->fcr}}</li>
                <li class="collection-item">Backfat Thickness: {{$product->backfat_thickness}} mm</li>
                <li class="collection-item">
                    <span class="row">
                        <i class="col s6">Delivery</i>
                        <span class="col s6">
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star_half</i>
                            <i class="material-icons yellow-text">star_border</i>
                        </span>
                    </span>
                    <span class="row">
                        <i class="col s6">Transaction</i>
                        <span class="col s6">
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star_border</i>
                        </span>
                    </span>
                    <span class="row">
                        <i class="col s6">Product Quality</i>
                        <span class="col s6">
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star_half</i>
                        </span>
                    </span>
                    <span class="row">
                        <i class="col s6">After Sales</i>
                        <span class="col s6">
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star</i>
                            <i class="material-icons yellow-text">star_half</i>
                            <i class="material-icons yellow-text">star_border</i>
                            <i class="material-icons yellow-text">star_border</i>
                        </span>
                    </span>
                </li>
            </ul>
        </div>
    </div>

    <div class="row">
        <div class="col s12">
            <div class="card">
                <div class="card-content black-text">
                    <span class="card-title">Other Details</span>
                    <p>{!! $product->other_details !!}</p>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('customScript')
    <script src="/js/vendor/imagezoom.js"> </script>
    <script src="/js/customer/viewProductDetail_script.js"> </script>
@endsection
