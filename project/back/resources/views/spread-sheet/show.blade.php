@extends('layouts.app')

@section('template_title')
    {{ $spreadSheet->name ?? "{{ __('Show') Spread Sheet" }}
@endsection

@section('content')
    <section class="content container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="float-left">
                            <span class="card-title">{{ __('Show') }} Spread Sheet</span>
                        </div>
                        <div class="float-right">
                            <a class="btn btn-primary" href="{{ route('spread-sheets.index') }}"> {{ __('Back') }}</a>
                        </div>
                    </div>

                    <div class="card-body">
                        
                        <div class="form-group">
                            <strong>Loan Id:</strong>
                            {{ $spreadSheet->loan_id }}
                        </div>
                        <div class="form-group">
                            <strong>Employee Id:</strong>
                            {{ $spreadSheet->employee_id }}
                        </div>
                        <div class="form-group">
                            <strong>Order:</strong>
                            {{ $spreadSheet->order }}
                        </div>
                        <div class="form-group">
                            <strong>Date:</strong>
                            {{ $spreadSheet->date }}
                        </div>
                        <div class="form-group">
                            <strong>Pay:</strong>
                            {{ $spreadSheet->pay }}
                        </div>
                        <div class="form-group">
                            <strong>Amount:</strong>
                            {{ $spreadSheet->amount }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
